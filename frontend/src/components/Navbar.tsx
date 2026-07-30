'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Drawer } from '@mantine/core';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchDialog } from './SearchDialog';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/projects', key: 'projects' },
  { href: '/team', key: 'team' },
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#121A4A] backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-500"
      >
        <div className="container-custom" style={{ paddingLeft: '0.25rem' }}>
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/images/logo-bykm.jpg" alt={t.brand.short[lang]} className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain" />
              </div>
              <div>
                <div className="text-white font-display font-bold text-lg leading-none">{t.brand.short[lang]}</div>
                <div className="text-gold-400 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase leading-tight">{t.brand.suffix[lang]}</div>
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
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <Drawer
        opened={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="right"
        size="75%"
        padding={0}
        withCloseButton={false}
        styles={{
          root: { zIndex: 60 },
          overlay: { background: 'rgba(8,6,22,0.85)', backdropFilter: 'blur(4px)' },
          body: { height: '100%' },
        }}
      >
        <div className="flex flex-col h-full bg-[#0c1445]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-white font-display font-bold text-lg">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white p-1.5 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-1 px-4 py-6 overflow-y-auto">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-gold-400 bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.nav[link.key as keyof typeof t.nav][lang]}
              </Link>
            ))}
          </div>
          <div className="px-6 pb-8 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
}
