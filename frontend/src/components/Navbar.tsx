'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchDialog } from './SearchDialog';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/projects', key: 'projects' },
  { href: '/news', key: 'news' },
  { href: '/gallery', key: 'gallery' },
  { href: '/contact', key: 'contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { lang, translations: t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHero = pathname === '/';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#121A4A] backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-500"
      >
        <div className="container-custom" style={{ paddingLeft: '0.25rem' }}>
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-bykm.jpg" alt="BYKM" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain" />
              </div>
              <div>
                <div className="text-white font-display font-bold text-lg leading-none">BYKM</div>
                <div className="text-gold-400 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase leading-tight">Trading PLC</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-white/80 hover:text-white transition-colors ${
                    pathname === link.href ? 'active text-white' : ''
                  }`}
                >
                  {t.nav[link.key as keyof typeof t.nav][lang]}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white/60 hover:text-white p-1.5 transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <LanguageSwitcher />
              <Link href="/contact" className="hidden md:flex btn-primary text-[10px] py-1 px-2.5">
                <span>{t.nav.partnerCta[lang]}</span>
              </Link>
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div
        className={`fixed inset-0 z-[60] bg-[#080616] transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white font-display text-3xl hover:text-gold-400 transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t.nav[link.key as keyof typeof t.nav][lang]}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-4">
            <span>{t.nav.partnerCta[lang]}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
