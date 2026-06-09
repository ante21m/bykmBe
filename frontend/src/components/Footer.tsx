'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';

export function Footer() {
  const { lang, translations: t } = useTranslation();
  const f = t.footer;

  return (
    <footer className="bg-[#080616] text-white">
      <div className="bg-gradient-to-r from-navy-800 via-navy-700 to-forest-600 py-12">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">{f.ctaTitle[lang]}</h2>
            <p className="text-white/70 mt-2 text-sm">{f.ctaSub[lang]}</p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap"><span>{f.engageCta[lang]}</span></Link>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-bykm.jpg" alt="BYKM" className="h-14 md:h-20 w-auto object-contain" />
                <div>
                <div className="font-display font-bold text-lg leading-none">BYKM</div>
                <div className="text-gold-400 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase">Trading PLC</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{f.brandDesc[lang]}</p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.bykmgroup.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="Website">
                <Globe size={15} />
              </a>
              <a href="https://linkedin.com/company/bykm-trading-plc" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="https://facebook.com/bykmgroup" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/bykmgroup" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="Twitter / X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/bykmgroup" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="https://youtube.com/@bykmgroup" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div>
<h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-gold-400 mb-5">{f.pillarsTitle[lang]}</h3>
          <ul className="space-y-3">
            {['agro', 'infra', 'logistics', 'digital', 'hospitality'].map((key) => (
              <li key={key}>
                <Link href={`/services?pillar=${key}`}
                  className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.pillars[key as keyof typeof f.pillars][lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-gold-400 mb-5">{f.quickLinksTitle[lang]}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.quickLinksLabels.about[lang]}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.quickLinksLabels.projects[lang]}
                </Link>
              </li>
              <li>
                <Link href="/about#esg" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.quickLinksLabels.esg[lang]}
                </Link>
              </li>
              <li>
                <Link href="/contact?inquiry=careers" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.quickLinksLabels.careers[lang]}
                </Link>
              </li>
              <li>
                <Link href="/contact?inquiry=partnership" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-500 rounded-full group-hover:scale-150 transition-transform" />
                  {f.quickLinksLabels.investors[lang]}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-gold-400 mb-5">{f.contactTitle[lang]}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={15} className="text-gold-400 mt-0.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: f.address[lang] }} />
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a href="tel:+251911343290" className="text-white/60 hover:text-white transition-colors">+251 911 34 32 90</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a href="tel:+251912764343" className="text-white/60 hover:text-white transition-colors">+251 912 76 43 43</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-gold-400 shrink-0" />
                <a href="mailto:bykmgroup@gmail.com" className="text-white/60 hover:text-white transition-colors">bykmgroup@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Service</Link>
          </div>
          <p className="text-white/40 text-xs sm:text-sm">{f.copyright[lang]}</p>
          <p className="text-white/30 text-xs sm:text-sm font-mono">{f.statutory[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
