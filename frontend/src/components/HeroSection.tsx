'use client';

import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import styles from './HeroSection.module.css';

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
  };
  lang: string;
}

interface TText {
  [key: string]: string;
}
const t: Record<string, TText> = {
  scroll: { en: 'Scroll', am: 'ስክሮል' },
  bgAlt: { en: 'BYKM Group — Ethiopian Integrated Future', am: 'ቢዋይኬኤም ግሩፕ — የኢትዮጵያ የተቀናጀ የወደፊት' },
};

export function HeroSection({ heroSection, lang }: HeroSectionProps) {
  return (
    <section className="relative min-h-[700px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[700px] overflow-hidden bg-[#080616]">
      <div className="absolute inset-0">
        <img src={heroSection.bgImage || '/images/hero-bg.jpg'} alt={t.bgAlt[lang] || t.bgAlt.en} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <div className="absolute inset-0 pointer-events-none z-[5] flex items-center justify-center">
        <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} />
        <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar1}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar2}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar3}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar4}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar5}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStar6}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter1}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter2}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter3}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter4}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter5}`} />
        <div className={`${styles.orbitStar} ${styles.orbitStarOuter6}`} />
        <div className={`${styles.travelerStar} ${styles.traveler1}`} />
        <div className={`${styles.travelerStar} ${styles.traveler2}`} />
        <div className={`${styles.travelerStar} ${styles.traveler3}`} />
        <div className={`${styles.travelerStar} ${styles.traveler4}`} />
        <div className={`${styles.travelerStar} ${styles.traveler5}`} />
        <div className={`${styles.travelerStar} ${styles.traveler6}`} />
        <div className={`${styles.travelerStar} ${styles.traveler7}`} />
        <div className={`${styles.travelerStar} ${styles.traveler8}`} />
      </div>
      <div className="geo-shape w-80 h-80 top-20 right-[-80px] rotate-12 opacity-40" />
      <div className="geo-shape w-48 h-48 bottom-32 right-32 rotate-6 opacity-20" />
      <div className="geo-shape w-32 h-32 top-1/3 right-1/4 opacity-10" />
      <div className="container-custom relative z-10 h-full flex flex-col justify-end pt-24 pb-16">
        <div className="max-w-4xl">
          {heroSection.edition[lang] && (
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold-400" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  {heroSection.edition[lang]}
                </span>
              </div>
            </ScrollReveal>
          )}
          <ScrollReveal delay={150}>
            <h1 className="font-display font-bold text-forest-500 leading-[1.1] mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl">
              {heroSection.line1[lang]}
            </h1>
          </ScrollReveal>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">{t.scroll[lang] || t.scroll.en}</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
