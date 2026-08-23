'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from './ScrollReveal';

interface HeroText {
  [key: string]: string;
}

interface HeroSectionProps {
  heroSection: {
    edition: HeroText;
    motto: HeroText;
    line1: HeroText;
    line2: HeroText;
    typeWords: { [key: string]: string[] };
    desc: HeroText;
    discoverBtn: HeroText;
    viewProjectsBtn: HeroText;
    bgImage?: string;
    heroImages?: string[];
  };
  lang: string;
}

interface TText {
  [key: string]: string;
}
const t: Record<string, TText> = {
  bgAlt: { en: 'BYKM Group — Ethiopian Integrated Future', am: 'ቢዋይኬኤም ግሩፕ — የኢትዮጵያ የተቀናጀ የወደፊት' },
};

const HERO_IMAGES = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
  '/images/hero/hero-5.jpg',
];

const SLIDE_INTERVAL = 7000;

export function HeroSection({ heroSection, lang }: HeroSectionProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const images =
    heroSection.heroImages && heroSection.heroImages.length > 0
      ? heroSection.heroImages
      : HERO_IMAGES;

  useEffect(() => {
    setActive(0);
  }, [heroSection.heroImages]);

  useEffect(() => {
    setProgress(0);
    const interval = 50;
    const step = (interval / SLIDE_INTERVAL) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [active, images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#080616]">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt={t.bgAlt[lang] || t.bgAlt.en}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${i === active ? 'scale-100' : 'scale-110'}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080616]/40 via-[#080616]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080616]/30 via-transparent to-transparent" />

      </div>

      <div className="container-custom relative z-10 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-3xl py-20">
          {heroSection.edition[lang] && (
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-gradient-to-r from-gold-400 to-gold-400/0" />
                <span className="font-mono text-[11px] tracking-[0.5em] text-gold-400/80 uppercase">
                  {heroSection.edition[lang]}
                </span>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={150}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
              {heroSection.motto[lang]}
            </h1>
          </ScrollReveal>



          <ScrollReveal delay={350}>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <Link
                href="/about"
                className="group relative inline-flex items-center px-10 py-5 bg-[#183587] text-white font-semibold tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[#1e3fa0] hover:shadow-[0_0_30px_rgba(24,53,135,0.5)] hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{heroSection.discoverBtn[lang]}</span>
              </Link>
              <Link
                href="/projects"
                className="group relative inline-flex items-center px-10 py-5 bg-[#183587] text-white font-semibold tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[#1e3fa0] hover:shadow-[0_0_30px_rgba(24,53,135,0.5)] hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{heroSection.viewProjectsBtn[lang]}</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="h-px bg-white/10 w-full">
          <div
            className="h-full bg-gold-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="container-custom flex items-center justify-end py-6">
          <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
            {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
