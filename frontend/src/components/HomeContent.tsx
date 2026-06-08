'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, Shield, Leaf, Zap, Globe, TrendingUp, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TypeWriter } from './TypeWriter';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { transformHomeSections, type RawHomeSection } from '@/lib/home-data';

const pillars = [
  { key: 'infra', icon: Shield, titleEn: 'Infrastructure, Engineering & Urban Development', descEn: 'Grade-4 General Contracting excellence: mega-corridors, eco-urban development, real estate, and technical consultancy shaping Ethiopia\'s smart cities.', descAm: 'የደረጃ-4 አጠቃላይ ኮንትራክተር የላቀነት፦ ሜጋ ኮሪደሮች፣ ኢኮ-ከተማ ልማት፣ ሪል እስቴት እና የኢትዮጵያን ስማርት ከተሞች የሚቀርጽ ቴክኒክ አማካሪነት።', accent: '#1a237e', href: '/services?pillar=infrastructure' },
  { key: 'logistics', icon: Globe, titleEn: 'Global Trade, Logistics & Transport', descEn: 'Strategic import/export, freight forwarding, warehousing, and fleet management connecting Ethiopian producers with international markets.', descAm: 'ስትራቴጂካዊ ማስመጣት/መላክ፣ የጭነት ዝውውር፣ መጋዘን እና የኢትዮጵያን አምራቾች ከአለም አቀፍ ገበያ ጋር የሚያገናኝ የመርከብ አስተዳደር።', accent: '#3949ab', href: '/services?pillar=logistics' },
  { key: 'agro', icon: Leaf, titleEn: 'Agro-Industrialization & Natural Resources', descEn: 'Managing the full value chain of Ethiopia\'s agricultural wealth — coffee, minerals, oilseeds — transforming raw resources into premium "Made in Ethiopia" exports.', descAm: 'የኢትዮጵያን የግብርና ሀብት ሙሉ ሰንሰለት ማስተዳደር — ቡና፣ ማዕድን፣ ቅባት እህሎች — ጥሬ ሀብቶችን ወደ ከፍተኛ "በኢትዮጵያ የተሰራ" ምርቶች መቀየር።', accent: '#2e7d32', href: '/services?pillar=agro' },
  { key: 'digital', icon: Zap, titleEn: 'Digital Economy, Media & Technical Services', descEn: 'ICT infrastructure, telecommunications, printing, publishing, and digital training services powering Ethiopia\'s knowledge economy.', descAm: 'የኢትዮጵያን የእውቀት ኢኮኖሚ የሚያጎለብቱ አይሲቲ መሠረተ ልማት፣ ቴሌኮሙኒኬሽን፣ ህትመት፣ እና ዲጂታል ስልጠና አገልግሎቶች።', accent: '#2e7d32', href: '/services?pillar=digital' },
  { key: 'hospitality', icon: TrendingUp, titleEn: 'Hospitality, Retail & Consumer Ecosystems', descEn: 'Luxury hotels, eco-resorts, tiered retail networks, and agricultural input supply elevating consumption standards for Modern Ethiopia.', descAm: 'የቅንጦት ሆቴሎች፣ ኢኮ-ሪዞርቶች፣ የተደራጁ የችርቻሮ አውታሮች እና ለዘመናዊቷ ኢትዮጵያ የፍጆታ ደረጃዎችን ከፍ የሚያደርግ የግብርና ግብዓት አቅርቦት።', accent: '#c8a84b', href: '/services?pillar=hospitality' },
];

const values = [
  { icon: Leaf, titleEn: 'The Green Legacy', titleAm: 'አረንጓዴ አሻራ', descEn: 'Green Engineering across every sector — from mining to manufacturing.', descAm: 'አረንጓዴ ምህንድስና በሁሉም ዘርፎች — ከማዕድን እስከ ማምረት።' },
  { icon: Shield, titleEn: 'Operational Excellence', titleAm: 'የአሰራር የላቀነት', descEn: 'Uncompromising precision and international quality in everything we do.', descAm: 'በምንሰራው ሁሉ የማይደራደር ትክክለኛነት እና ዓለም አቀፍ ጥራት።' },
  { icon: Zap, titleEn: 'Synergetic Innovation', titleAm: 'ተመሳሳሪ ፈጠራ', descEn: 'Integrated strengths powering factories and global supply chains.', descAm: 'ፋብሪካዎችን እና ዓለም አቀፍ አቅርቦት ሰንሰለቶችን የሚያጎለብቱ የተቀናጁ ጥንካሬዎች።' },
  { icon: Users, titleEn: 'National Pride & Impact', titleAm: 'ብሄራዊ ኩራት እና ተጽእኖ', descEn: 'Building Ethiopia through job creation and nationwide transformation.', descAm: 'የስራ ዕድል በመፍጠር እና በሀገር አቀፍ ለውጥ ኢትዮጵያን መገንባት።' },
];

const partnerNames = [
  { en: 'Addis Ababa City Administration', am: 'የአዲስ አበባ ከተማ አስተዳደር' },
  { en: 'Federal Ministry of Urban Development', am: 'የፌደራል ከተማ ልማት ሚኒስቴር' },
  { en: 'Ethiopian Construction Authority', am: 'የኢትዮጵያ ኮንስትራክሽን ባለስልጣን' },
  { en: 'Commercial Bank of Ethiopia', am: 'የኢትዮጵያ ንግድ ባንክ' },
  { en: 'Awash International Bank', am: 'አዋሽ ዓለም አቀፍ ባንክ' },
];

interface Props {
  sections?: RawHomeSection[];
}

export function HomeContent({ sections }: Props) {
  const { lang, translations: t } = useTranslation();
  const api = sections ? transformHomeSections(sections) : null;

  // Merge API data over translation defaults
  const h = api ? {
    hero: {
      edition: { en: api.hero.edition.en, am: api.hero.edition.am },
      motto: { en: api.hero.motto.en, am: api.hero.motto.am },
      line1: { en: api.hero.line1.en, am: api.hero.line1.am },
      line2: { en: api.hero.line2.en, am: api.hero.line2.am },
      typeWords: { en: api.hero.typeWords.en.split(',').map((s: string) => s.trim()), am: api.hero.typeWords.am.split(',').map((s: string) => s.trim()) },
      desc: { en: api.hero.desc.en, am: api.hero.desc.am },
      discoverBtn: { en: api.hero.discoverBtn.en, am: api.hero.discoverBtn.am },
      viewProjectsBtn: { en: api.hero.viewProjectsBtn.en, am: api.hero.viewProjectsBtn.am },
    },
    heroStats: api.heroStats.length > 0 ? api.heroStats.map(s => ({
      value: s.value,
      unit: { en: s.unit.en, am: s.unit.am },
      label: { en: s.label.en, am: s.label.am },
    })) : t.home.heroStats,
    mission: {
      label: { en: api.mission.label.en, am: api.mission.label.am },
      title: { en: api.mission.title.en || t.home.mission.title.en, am: api.mission.title.am || t.home.mission.title.am },
      items: api.mission.items.length > 0 ? api.mission.items.map(item => ({
        label: { en: item.label.en, am: item.label.am },
        sub: { en: item.sub.en, am: item.sub.am },
      })) : t.home.mission.items,
    },
    pillars: {
      label: { en: api.pillars.label.en, am: api.pillars.label.am },
      title: { en: api.pillars.title.en || t.home.pillars.title.en, am: api.pillars.title.am || t.home.pillars.title.am },
      desc: { en: api.pillars.desc.en || t.home.pillars.desc.en, am: api.pillars.desc.am || t.home.pillars.desc.am },
      explore: { en: api.pillars.explore.en, am: api.pillars.explore.am },
    },
    pillarsData: api.pillarsData.length > 0 ? api.pillarsData.map(p => ({
      tagline: { en: p.tagline.en, am: p.tagline.am },
      exploreLabel: { en: p.exploreLabel.en, am: p.exploreLabel.am },
    })) : t.home.pillarsData,
    flagship: {
      label: { en: api.flagship.label.en, am: api.flagship.label.am },
      title: { en: api.flagship.title.en || t.home.flagship.title.en, am: api.flagship.title.am || t.home.flagship.title.am },
      desc: { en: api.flagship.desc.en || t.home.flagship.desc.en, am: api.flagship.desc.am || t.home.flagship.desc.am },
      viewAll: { en: api.flagship.viewAll.en, am: api.flagship.viewAll.am },
      kpis: api.flagship.kpis.length > 0 ? api.flagship.kpis.map(k => ({
        val: k.val,
        label: { en: k.label.en, am: k.label.am },
      })) : t.home.flagship.kpis,
      client: { en: api.flagship.client.en || t.home.flagship.client.en, am: api.flagship.client.am || t.home.flagship.client.am },
      clientSub: { en: api.flagship.clientSub.en || t.home.flagship.clientSub.en, am: api.flagship.clientSub.am || t.home.flagship.clientSub.am },
    },
    values: {
      label: { en: api.values.label.en, am: api.values.label.am },
      title: { en: api.values.title.en || t.home.values.title.en, am: api.values.title.am || t.home.values.title.am },
    },
    esg: {
      label: { en: api.esg.label.en, am: api.esg.label.am },
      title: { en: api.esg.title.en || t.home.esg.title.en, am: api.esg.title.am || t.home.esg.title.am },
      desc: { en: api.esg.desc.en || t.home.esg.desc.en, am: api.esg.desc.am || t.home.esg.desc.am },
      cta: { en: api.esg.cta.en, am: api.esg.cta.am },
    },
    partners: {
      label: { en: api.partners.label.en, am: api.partners.label.am },
      title: { en: api.partners.title.en || t.home.partners.title.en, am: api.partners.title.am || t.home.partners.title.am },
    },
    cta: {
      label: { en: api.cta.label.en || t.home.cta.label.en, am: api.cta.label.am || t.home.cta.label.am },
      title: { en: api.cta.title.en, am: api.cta.title.am },
      desc: { en: api.cta.desc.en || t.home.cta.desc.en, am: api.cta.desc.am || t.home.cta.desc.am },
      partnershipBtn: { en: api.cta.partnershipBtn.en, am: api.cta.partnershipBtn.am },
      inquiryBtn: { en: api.cta.inquiryBtn.en, am: api.cta.inquiryBtn.am },
    },
  } : t.home;

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080616]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,8,30,0.6)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="geo-shape w-80 h-80 top-20 right-[-80px] rotate-12 opacity-40" />
        <div className="geo-shape w-48 h-48 bottom-32 right-32 rotate-6 opacity-20" />
        <div className="geo-shape w-32 h-32 top-1/3 right-1/4 opacity-10" />
        <div className="container-custom relative z-10 pt-28 pb-20">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold-400" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{h.hero.edition[lang]}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl text-gold-400 font-semibold tracking-wide mb-3 mt-8">{h.hero.motto[lang]}</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-display font-bold text-white leading-[1.1] mb-6">
                <span className="block text-2xl sm:text-3xl md:text-4xl xl:text-5xl">{h.hero.line1[lang]}</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-gradient-gold">{h.hero.line2[lang]}</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
                  <TypeWriter strings={h.hero.typeWords[lang]} speed={100} pauseTime={3000} />
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">{h.hero.desc[lang]}</p>
            </ScrollReveal>
            <ScrollReveal delay={450}>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary"><span>{h.hero.discoverBtn[lang]}</span><ArrowRight size={16} /></Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest border border-white/30 text-white hover:bg-white hover:text-navy-900 transition-all duration-300"><span>{h.hero.viewProjectsBtn[lang]}</span></Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
                {h.heroStats.map((stat, i) => (
                  <div key={i}>
                    <div className="stat-number">{stat.value}<span className="text-lg text-gold-400/70 ml-1">{stat.unit[lang]}</span></div>
                    <p className="text-white/40 text-sm uppercase tracking-wide mt-1 font-mono">{stat.label[lang]}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      <ScrollReveal>
        <section className="bg-white py-12 border-y border-navy-100">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
              <div className="shrink-0">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase block mb-1">{h.mission.label[lang]}</span>
                <p className="font-display text-xl md:text-2xl font-semibold text-navy-900 max-w-md">{h.mission.title[lang]}</p>
              </div>
              <div className="hidden md:block h-16 w-px bg-navy-100" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                {h.mission.items.map((item, i) => (
                  <div key={i} className="border-l-2 border-gold-400 pl-3">
                    <p className="font-bold text-navy-900 text-sm">{item.label[lang]}</p>
                    <p className="text-navy-700/60 text-sm mt-0.5">{item.sub[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-[#f5f4ef]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.pillars.label[lang]}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mt-3">{h.pillars.title[lang]}</h2>
              <p className="text-navy-700/60 mt-4 max-w-2xl mx-auto">{h.pillars.desc[lang]}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <Link key={pillar.key} href={pillar.href}
                    className={`pillar-card hover-lift bg-white rounded-none p-8 group block ${i === 0 ? 'lg:col-span-2' : ''}`}>
                    <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: `${pillar.accent}15` }}>
                      <Icon size={22} style={{ color: pillar.accent }} />
                    </div>
                    <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-gold-600">{h.pillarsData[i].tagline[lang]}</span>
                    <h3 className="font-display text-xl font-bold text-navy-900 mt-2 mb-3 group-hover:text-navy-600 transition-colors">{pillar.titleEn}</h3>
                    <p className="text-navy-700/60 text-base leading-relaxed mb-4">{lang === 'en' ? pillar.descEn : pillar.descAm}</p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-600 group-hover:text-gold-600 transition-colors">
                      <span>{h.pillarsData[i].exploreLabel[lang]}</span><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#081144] text-white py-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{h.flagship.label[lang]}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">{h.flagship.title[lang]}</h2>
                <p className="text-white/60 leading-relaxed mb-8">{h.flagship.desc[lang]}</p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {h.flagship.kpis.map((kpi, i) => (
                    <div key={i} className="border-t border-gold-500/30 pt-4">
                      <div className="font-display text-2xl font-bold text-gold-400">{kpi.val}</div>
                      <p className="text-white/40 text-sm mt-1">{kpi.label[lang]}</p>
                    </div>
                  ))}
                </div>
                <Link href="/projects" className="btn-primary"><span>{h.flagship.viewAll[lang]}</span><ArrowRight size={16} /></Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-navy-800 to-navy-700 aspect-square max-w-md ml-auto relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 border-2 border-gold-400/40 mx-auto mb-6 flex items-center justify-center">
                        <Shield size={40} className="text-gold-400" />
                      </div>
                      <p className="font-display text-xl font-bold text-white">{h.flagship.client[lang]}</p>
                      <p className="text-white/50 text-sm mt-2">{h.flagship.clientSub[lang]}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 w-12 h-12 border border-gold-400/20" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border border-gold-400/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.values.label[lang]}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mt-3">{h.values.title[lang]}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div key={val.titleEn} className="group">
                    <div className="text-4xl font-display font-bold text-navy-100 mb-3 group-hover:text-gold-200 transition-colors">0{i + 1}</div>
                    <div className="flex items-center gap-2 mb-3"><Icon size={18} className="text-forest-500" /><h3 className="font-bold text-navy-900">{lang === 'en' ? val.titleEn : val.titleAm}</h3></div>
                    <p className="text-navy-700/60 text-base leading-relaxed">{lang === 'en' ? val.descEn : val.descAm}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-gradient-to-r from-forest-600 to-navy-700 text-white py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/60 uppercase">{h.esg.label[lang]}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">{h.esg.title[lang]}</h2>
                <p className="text-white/70">{h.esg.desc[lang]}</p>
              </div>
              <Link href="/about#esg" className="btn-outline border-white text-white hover:bg-white hover:text-forest-600 whitespace-nowrap shrink-0">
                <span>{h.esg.cta[lang]}</span><ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-[#f5f4ef]">
          <div className="container-custom text-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.partners.label[lang]}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-12">{h.partners.title[lang]}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partnerNames.map((partner) => (
                <div key={partner.en} className="bg-white border border-navy-100 p-6 flex items-center justify-center text-center hover-lift">
                  <p className="text-navy-700/70 text-sm font-bold uppercase tracking-wide leading-snug">{lang === 'en' ? partner.en : partner.am}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#0a1a6b] text-white py-24">
          <div className="container-custom text-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{h.cta.label[lang]}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl mx-auto">{h.cta.title[lang]}</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">{h.cta.desc[lang]}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?inquiry=partnership" className="btn-primary text-sm"><span>{h.cta.partnershipBtn[lang]}</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn-primary text-sm"><span>{h.cta.inquiryBtn[lang]}</span></Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
