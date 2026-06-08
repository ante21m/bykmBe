'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Languages } from 'lucide-react';
import { useSendChatMutation } from '@/lib/redux/api';

type Lang = 'en' | 'am';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
}

const i18n: Record<Lang, {
  header: string;
  subtitle: string;
  inputPlaceholder: string;
  thinking: string;
  quickTitle: string;
  welcomeEn: string;
  welcomeAm: string;
  errorMsg: string;
}> = {
  en: {
    header: 'BYKM Smart Assistant',
    subtitle: 'AI-Powered · Company Knowledge',
    inputPlaceholder: 'Ask about BYKM...',
    thinking: 'Thinking...',
    quickTitle: 'Quick Questions',
    welcomeEn: "Welcome to BYKM Trading PLC! I'm your smart assistant. Ask me anything about our company, services, projects, or partnerships.",
    welcomeAm: 'እንኳን ወደ ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በደህና መጡ! እኔ የእርስዎ ብልህ ረዳት ነኝ።',
    errorMsg: "I apologize, but I'm having trouble connecting. Please try again or use our contact form for urgent inquiries.",
  },
  am: {
    header: 'ቢኬኤም ብልህ ረዳት',
    subtitle: 'በአይ የተጎላበተ · የኩባንያ እውቀት',
    inputPlaceholder: 'ስለ ቢኬኤም ይጠይቁ...',
    thinking: 'በማሰብ ላይ...',
    quickTitle: 'ፈጣን ጥያቄዎች',
    welcomeEn: "Welcome to BYKM Trading PLC! I'm your smart assistant. Ask me anything about our company, services, projects, or partnerships.",
    welcomeAm: 'እንኳን ወደ ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በደህና መጡ! እኔ የእርስዎ ብልህ ረዳት ነኝ።',
    errorMsg: 'ይቅርታ፣ ግን መገናኘት አልቻልኩም። እባክዎ እንደገና ይሞክሩ ወይም ለአስቸኳይ ጥያቄዎች የእውቂያ ቅጻችንን ይጠቀሙ።',
  },
};

const suggestionLabels: Record<string, { en: string; am: string }> = {
  'company overview': { en: 'Company Overview', am: 'የኩባንያ አጠቃላይ እይታ' },
  'business pillars': { en: 'Business Pillars', am: 'የንግድ ምሰሶዎች' },
  'contact info': { en: 'Contact Info', am: 'የመገኛ አድራሻ' },
};

const quickQueriesEn = [
  'company overview',
  'business pillars',
  'contact info',
];

const quickQueriesAm = [
  'company overview',
  'business pillars',
  'contact info',
];

export function SmartChat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const t = i18n[lang];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.welcomeEn },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sendChat] = useSendChatMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const toggleLang = () => {
    const newLang: Lang = lang === 'en' ? 'am' : 'en';
    setLang(newLang);
    setShowQuick(true);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowQuick(false);
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendChat({ message: text, lang }).unwrap();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply, suggestions: data.suggestions }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: t.errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQueries = lang === 'en' ? quickQueriesEn : quickQueriesAm;

  const getSuggestionLabel = (key: string) => {
    const label = suggestionLabels[key.toLowerCase()];
    if (label) return label[lang];
    return key;
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[99] w-[360px] max-w-[calc(100vw-2rem)] bg-white shadow-2xl border border-navy-100 flex flex-col animate-fade-up" style={{ maxHeight: '560px' }}>
          <div className="bg-[#080616] text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-forest-500 to-navy-700 flex items-center justify-center">
                <Bot size={16} className="text-gold-400" />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">{t.header}</p>
                <p className="text-white/50 text-xs sm:text-sm font-mono mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLang}
                className={`px-2 py-1 text-xs sm:text-sm font-mono flex items-center gap-1 border transition-colors ${lang === 'am' ? 'bg-gold-500/20 border-gold-500/50 text-gold-400' : 'border-white/20 text-white/60 hover:text-white'}`}
                title={lang === 'en' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ቀይር'}
              >
                <Languages size={12} />
                {lang === 'en' ? 'EN' : 'አማ'}
              </button>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: '300px', maxHeight: '380px' }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'assistant' ? 'bg-navy-100' : 'bg-forest-100'}`}>
                    {msg.role === 'assistant' ? <Bot size={14} className="text-navy-700" /> : <User size={14} className="text-forest-600" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-navy-50 text-navy-900' : 'bg-forest-500 text-white'}`} style={msg.role === 'user' && /[\u1200-\u137F]/.test(msg.text) ? { fontFamily: 'var(--font-lato)' } : {}}>
                    {msg.text}
                  </div>
                </div>
                {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5 ml-10">
                    {msg.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs sm:text-sm border border-gold-500/40 text-gold-600 px-2.5 py-1 hover:bg-gold-50 transition-colors"
                      >
                        {getSuggestionLabel(s)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-navy-700" />
                </div>
                <div className="bg-navy-50 px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            {showQuick && messages.length === 1 && (
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-mono tracking-wider text-navy-400 uppercase mb-2">{t.quickTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {quickQueries.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-sm border border-navy-200 px-3 py-1.5 text-navy-600 hover:bg-navy-50 hover:border-navy-400 transition-colors"
                    >
                      {getSuggestionLabel(q)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-navy-100 p-3 shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="flex-1 px-3 py-2 text-sm border border-navy-200 outline-none focus:border-navy-600 transition-colors"
                disabled={loading}
                dir={lang === 'am' ? 'auto' : 'ltr'}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#080616] text-white px-4 flex items-center justify-center hover:bg-navy-700 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[99] w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-300 ${open ? 'bg-navy-700 rotate-90' : 'bg-[#080616] hover:bg-navy-700'} text-white`}
        aria-label={lang === 'en' ? 'Toggle smart assistant' : 'የብልህ ረዳት መቀየሪያ'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
