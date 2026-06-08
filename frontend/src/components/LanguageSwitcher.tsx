'use client';

import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
      className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm font-mono tracking-wider border transition-colors border-white/20 text-white/70 hover:text-white hover:border-gold-400/50"
      title={lang === 'en' ? 'Switch to Amharic / ወደ አማርኛ ቀይር' : 'Switch to English / ወደ እንግሊዝኛ ቀይር'}
    >
      <Languages size={13} />
      <span className="font-bold">{lang === 'en' ? 'አማ' : 'EN'}</span>
    </button>
  );
}
