'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/siteConfig';

const socialIcons = [
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { href: SOCIAL_LINKS.facebook, label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { href: SOCIAL_LINKS.twitter, label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { href: SOCIAL_LINKS.youtube, label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
];

export function Footer() {
  const { lang, translations: t } = useTranslation();
  const f = t.footer;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1240] via-[#080f2e] to-[#050820]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10">
          <div className="container-custom pt-20 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

              <div>
<Link href="/" className="flex items-center gap-3 mb-8 group">
                  <img src="/images/logo-bykm.jpg" alt={t.brand.short[lang]} className="h-14 w-auto object-contain" />
                  <div>
                    <div className="font-display font-bold text-lg leading-none text-white group-hover:text-gold-400 transition-colors duration-300">{t.brand.short[lang]}</div>
                    <div className="text-gold-400 text-[9px] font-mono tracking-[0.35em] uppercase mt-1.5">{t.brand.suffix[lang]}</div>
                  </div>
                </Link>

                <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-400 mb-5">{lang === 'en' ? 'Company' : 'ኩባንያ'}</h3>
                <ul className="space-y-3">
                  {[
                    { href: '/about', label: lang === 'en' ? 'Who We Are' : 'እኛ ማን ነን' },
                    { href: '/team', label: lang === 'en' ? 'Founder' : 'መሥራች' },
                    { href: '/careers', label: lang === 'en' ? 'Careers' : 'ሙያዎች' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300">
                        <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-400 mb-5">{lang === 'en' ? 'Quick Links' : 'ፈጣን አገናኞች'}</h3>
                <ul className="space-y-3">
                  {[
                    { href: '/services', label: lang === 'en' ? 'Services' : 'አገልግሎቶች' },
                    { href: '/projects', label: f.quickLinksLabels.projects[lang] },
                    { href: '/news', label: lang === 'en' ? 'News' : 'ዜና' },
                    { href: '/contact', label: lang === 'en' ? 'Contact Us' : 'ያግኙን' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300">
                        <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>
                  <Link href="/contact" className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-400 mb-5 inline-block hover:text-white transition-colors duration-300">
                    {lang === 'en' ? 'Contact Us' : 'ግንኙነት'}
                  </Link>
                </h3>
                <div className="flex gap-3 mb-6">
                  {socialIcons.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-400/40 hover:bg-gold-400/5 hover:scale-110 transition-all duration-300" aria-label={s.label}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                    </a>
                  ))}
                </div>
                <div className="space-y-3">
<div className="flex items-start gap-3 text-sm text-white/70">
                    <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Yeka Sub-City, Woreda 08, House No. 4-04, Addis Ababa, Ethiopia')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-400 transition-colors duration-300"
                    >
                      <span dangerouslySetInnerHTML={{ __html: f.address[lang] }} />
                    </a>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=my_location&destination=${encodeURIComponent('Yeka Sub-City, Woreda 08, House No. 4-04, Addis Ababa, Ethiopia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-gold-400 border border-gold-400/40 px-3 py-2 hover:bg-gold-400/10 hover:border-gold-400 transition-colors duration-300"
                  >
                    <MapPin size={14} />
                    <span>{lang === 'en' ? 'Map' : 'ካርታ'}</span>
                  </a>
                  {CONTACT_INFO.phones.map((phone) => (
                    <div key={phone.number} className="flex items-center gap-3 text-sm">
                      <Phone size={14} className="text-gold-400 shrink-0" />
                      <a href={`tel:${phone.number.replace(/\s/g, '')}`} className="text-white/70 hover:text-white transition-colors duration-300">{phone.number}</a>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={14} className="text-gold-400 shrink-0" />
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-white/70 hover:text-white transition-colors duration-300">{CONTACT_INFO.email}</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-white/10">
  <div className="container-custom py-7 sm:py-8">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-center md:text-left text-xs sm:text-sm text-white/50 leading-relaxed">
        {f.copyright[lang]}
      </p>

      <nav
        aria-label="Legal"
        className="flex items-center justify-center gap-3 sm:gap-4"
      >
        {[
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Service' },
        ].map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && (
              <span className="text-white/20 text-xs" aria-hidden="true">
                •
              </span>
            )}

            <Link
              href={link.href}
              className="group relative text-xs sm:text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </Fragment>
        ))}
      </nav>
    </div>

     </div>
</div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gold-400 text-[#080f2e] shadow-xl flex items-center justify-center hover:bg-white transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </>
  );
}
