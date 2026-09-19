'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Leaf, Zap, Globe, TrendingUp, Users, Calendar, CalendarDays, Clock, Tag } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedCounter } from './AnimatedCounter';
import { HeroSection } from './HeroSection';
import { NumberedCard } from './NumberedCard';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { tr } from '@/lib/i18n/tr';
import { transformHomeSections, type RawHomeSection } from '@/lib/home-data';
import { useGetRecentNewsQuery, useGetHomeSectionsQuery } from '@/lib/redux/api';

const pillars = [
  { key: 'infra', icon: Shield, titleEn: 'Infrastructure & Real Estate Development', titleAm: 'መሠረተ ልማት እና ሪል እስቴት ልማት', descEn: 'We build Ethiopia\'s future with General Contracting — roads, buildings, water systems, and smart city solutions that improve everyday life.', descAm: 'የኢትዮጵያን የወደፊት እጣ ፈንታ በአጠቃላይ ኮንትራክተርነት እንገነባለን — መንገዶች፣ ህንፃዎች፣ የውሃ ሥርዓቶች እና የዕለት ተዕለት ኑሮን የሚያሻሽሉ ስማርት ከተማ መፍትሄዎች።', accent: '#1a237e', href: '/services?pillar=infrastructure' },
  { key: 'logistics', icon: Globe, titleEn: 'Global Trade, Logistics & Transport', titleAm: 'ዓለም አቀፍ ንግድ፣ ሎጂስቲክስ እና ትራንስፖርት', descEn: 'We connect Ethiopian businesses to the world through smart trade, reliable shipping, and modern warehousing solutions.', descAm: 'የኢትዮጵያን ንግዶች በዘመናዊ ንግድ፣ አስተማማኝ መላኪያ እና ዘመናዊ የመጋዘን መፍትሄዎች ከዓለም ጋር እናገናኛለን።', accent: '#3949ab', href: '/services?pillar=logistics' },
  { key: 'hospitality', icon: TrendingUp, titleEn: 'Hospitality, Retail & Consumer Ecosystems', titleAm: 'ሆስፒታሊቲ፣ ችርቻሮ እና የሸማች ሥነ-ምህዳር', descEn: 'We create unforgettable experiences through luxury hotels, eco-resorts, and retail networks that elevate everyday living.', descAm: 'የማይረሱ ተሞክሮዎችን በቅንጦት ሆቴሎች፣ ኢኮ-ሪዞርቶች እና የዕለት ተዕለት ኑሮን በሚያሻሽሉ የችርቻሮ አውታሮች እንፈጥራለን።', accent: '#c8a84b', href: '/services?pillar=hospitality' },
  { key: 'agro', icon: Leaf, titleEn: 'Agro-Industrialization & Natural Resources', titleAm: 'አግሮ-ኢንዱስትሪላይዜሽን እና የተፈጥሮ ሀብቶች', descEn: 'We turn Ethiopia\'s finest coffee, minerals, and oilseeds into world-class products — from farm to global shelf.', descAm: 'የኢትዮጵያን ምርጥ ቡና፣ ማዕድናት እና ቅባት እህሎች ከእርሻ እስከ ዓለም አቀፍ መደርደሪያ ድረስ ወደ ዓለም ደረጃ ምርቶች እንለውጣለን።', accent: '#2e7d32', href: '/services?pillar=agro' },
];

const values = [
  { icon: Leaf, titleEn: 'Eco-Innovation', titleAm: 'ኢኮ-ፈጠራ', descEn: 'Protecting our planet through sustainable practices in everything we build and make.', descAm: 'በምንገነባው እና በምንሰራው ሁሉ ዘላቂ በሆኑ ተግባራት ፕላኔታችንን መጠበቅ።' },
  { icon: Shield, titleEn: 'Uncompromising Precision', titleAm: 'የማይደራደር ትክክለኛነት', descEn: 'Delivering quality you can trust — every project, every time.', descAm: 'ሊተማመኑበት የሚችሉትን ጥራት ማቅረብ — በእያንዳንዱ ፕሮጀክት፣ በእያንዳንዱ ጊዜ።' },
  { icon: Zap, titleEn: 'Vertical Synergy', titleAm: 'አቀባዊ ተመሳሳሪነት', descEn: 'Combining our strengths to create smarter solutions for industry and trade.', descAm: 'ለኢንዱስትሪ እና ለንግድ የተሻሉ መፍትሄዎችን ለመፍጠር ጥንካሬያችንን ማጣመር።' },
  { icon: TrendingUp, titleEn: 'National Transformation', titleAm: 'ብሄራዊ ለውጥ', descEn: 'Creating jobs, building communities, and shaping a brighter future for Ethiopia.', descAm: 'የስራ ዕድሎችን መፍጠር፣ ማህበረሰቦችን መገንባት እና ለኢትዮጵያ የተሻለ የወደፊት እጣ ፈንታን መቅረጽ።' },
  { icon: Users, titleEn: 'Ethical Legacy', titleAm: 'ሥነ ምግባራዊ ውርስ', descEn: 'Building with integrity, operating with transparency, and honoring our commitments.', descAm: 'በታማኝነት መገንባት፣ በግልጽነት መስራት እና ቃል ኪዳናችንን ማክበር።' },
];

export function RecentNewsSection() {
  const { lang, translations: t } = useTranslation();
  const { data: newsItems, isLoading } = useGetRecentNewsQuery({ limit: 4 });

  if (isLoading || !newsItems || newsItems.length === 0) return null;

  const featured = newsItems[0];
  const remaining = newsItems.slice(1);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const readingTime = (text?: string) => {
    if (!text) return '1 min';
    const words = text.split(/\s+/).length;
    const min = Math.max(1, Math.ceil(words / 200));
    return `${min} min`;
  };

  return (
    <ScrollReveal>
      <section className="bg-[#f5f4ef]">
        <div className="container-custom py-24">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{lang === 'en' ? 'Latest News' : 'የቅርብ ጊዜ ዜና'}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mt-3 leading-tight">{lang === 'en' ? 'Stay Updated' : 'ዝመናዎችን ይከታተሉ'}</h2>
              <p className="text-slate-500 text-base mt-3 max-w-xl">{lang === 'en' ? ('Corporate announcements, project milestones, and strategic updates from ' + t.brand.name.en + '.') : (t.brand.name.am + ' የኮርፖሬት ማስታወቂያዎች፣ የፕሮጀክት ምዕራፎች እና ስትራቴጂካዊ ዝማኔዎች።')}</p>
            </div>
            <Link href="/news" className="group hidden md:inline-flex items-center gap-2 bg-[#183587] text-white px-6 py-3 text-sm font-medium hover:bg-[#1a237e] transition-all duration-300">
              <span>{lang === 'en' ? 'View All News' : 'ሁሉንም ዜና ይመልከቱ'}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Featured Article - same as /news page */}
          {featured && (
            <Link href={`/news/${featured.id}`} className="group block relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-xl transition-all duration-500 mb-8">
              <div className="grid md:grid-cols-2 gap-0 min-h-[420px]">
                {featured.imageUrl && (
                  <div className="relative overflow-hidden h-64 md:h-auto">
                    <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    <div className="absolute top-5 left-5 bg-[#183587] text-white text-[10px] font-mono tracking-[0.2em] uppercase px-4 py-2">
                      {lang === 'en' ? 'Featured' : 'ዋና ዜና'}
                    </div>
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs font-mono mb-5">
                    {featured.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={12} />
                        {formatDate(featured.publishedAt)}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {readingTime(featured.content)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-[#183587] transition-colors duration-300">
                    {lang === 'am' && featured.titleAm ? featured.titleAm : featured.title}
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed line-clamp-3 mb-6">
                    {lang === 'am' && featured.excerptAm ? featured.excerptAm : featured.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#183587] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining Articles - same as /news page grid */}
          {remaining.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remaining.map((article) => (
                <Link href={`/news/${article.id}`} key={article.id} className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                  {article.imageUrl && (
                    <div className="relative overflow-hidden h-52 shrink-0">
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {article.tags && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {article.tags.split(',').slice(0, 2).map((tag) => (
                            <span key={tag} onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/news?tag=${encodeURIComponent(tag.trim())}`; }} className="inline-flex items-center gap-1 text-white bg-black/40 backdrop-blur-sm text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 hover:bg-[#183587] transition-colors duration-300 cursor-pointer">
                              <Tag size={9} />
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-mono mb-3">
                      {article.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={11} />
                          {formatDate(article.publishedAt)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {readingTime(article.content)}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-[#183587] transition-colors duration-300 line-clamp-2">
                      {lang === 'am' && article.titleAm ? article.titleAm : article.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[#183587] font-medium text-xs group-hover:gap-3 transition-all duration-300 mt-auto pt-4 border-t border-slate-100">
                      {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Mobile View All */}
          <div className="mt-10 md:hidden">
            <Link href="/news" className="group flex items-center justify-center gap-2 bg-[#183587] text-white px-6 py-3.5 text-sm font-medium hover:bg-[#1a237e] transition-all duration-300 w-full">
              <span>{lang === 'en' ? 'View All News' : 'ሁሉንም ዜና ይመልከቱ'}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

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

export function HomeContent({ sections: serverSections }: Props) {
  const { lang, translations: t } = useTranslation();
  const { data: clientSections } = useGetHomeSectionsQuery();
  const sections = clientSections ?? serverSections;
  const api = sections ? transformHomeSections(sections) : null;

  const h = api ? {
    heroSection: {
      edition: { en: api.heroSection.edition.en, am: api.heroSection.edition.am },
      motto: { en: api.heroSection.motto.en, am: api.heroSection.motto.am },
      line1: { en: api.heroSection.line1.en, am: api.heroSection.line1.am },
      line2: { en: api.heroSection.line2.en, am: api.heroSection.line2.am },
      typeWords: { en: api.heroSection.typeWords.en.split(',').map((s: string) => s.trim()), am: api.heroSection.typeWords.am.split(',').map((s: string) => s.trim()) },
      desc: { en: api.heroSection.desc.en, am: api.heroSection.desc.am },
      discoverBtn: { en: api.heroSection.discoverBtn.en, am: api.heroSection.discoverBtn.am },
      viewProjectsBtn: { en: api.heroSection.viewProjectsBtn.en, am: api.heroSection.viewProjectsBtn.am },
      bgImage: api.heroSection.bgImage,
      heroImages: api.heroSection.heroImages,
    },
    mission: {
      label: { en: api.mission.label.en, am: api.mission.label.am },
      title: { en: api.mission.title.en || t.home.mission.title.en, am: api.mission.title.am || t.home.mission.title.am },
      desc: { en: api.mission.desc.en || t.home.mission.desc.en, am: api.mission.desc.am || t.home.mission.desc.am },
      items: api.mission.items.length > 0 ? api.mission.items.map(item => ({
        label: { en: item.label.en, am: item.label.am },
        sub: { en: item.sub.en, am: item.sub.am },
        desc: { en: item.desc?.en || '', am: item.desc?.am || '' },
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
      imageUrl: p.imageUrl,
    })) : t.home.pillarsData,
    flagshipProject: {
      label: { en: api.flagshipProject.label.en, am: api.flagshipProject.label.am },
      title: { en: api.flagshipProject.title.en || t.home.flagshipProject.title.en, am: api.flagshipProject.title.am || t.home.flagshipProject.title.am },
      desc: { en: api.flagshipProject.desc.en || t.home.flagshipProject.desc.en, am: api.flagshipProject.desc.am || t.home.flagshipProject.desc.am },
      viewAll: { en: api.flagshipProject.viewAll.en, am: api.flagshipProject.viewAll.am },
      kpis: api.flagshipProject.kpis.length > 0 ? api.flagshipProject.kpis.map(k => ({
        val: k.val,
        label: { en: k.label.en, am: k.label.am },
      })) : t.home.flagshipProject.kpis,
      client: { en: api.flagshipProject.client.en || t.home.flagshipProject.client.en, am: api.flagshipProject.client.am || t.home.flagshipProject.client.am },
      clientSub: { en: api.flagshipProject.clientSub.en || t.home.flagshipProject.clientSub.en, am: api.flagshipProject.clientSub.am || t.home.flagshipProject.clientSub.am },
      stats: api.flagshipProject.stats && api.flagshipProject.stats.length > 0 ? api.flagshipProject.stats.map(s => ({
        value: s.value,
        unit: { en: s.unit.en, am: s.unit.am },
        label: { en: s.label.en, am: s.label.am },
      })) : t.home.flagshipProject.stats,
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
    ctaSection: {
      label: { en: api.ctaSection.label.en || t.home.ctaSection.label.en, am: api.ctaSection.label.am || t.home.ctaSection.label.am },
      title: { en: api.ctaSection.title.en, am: api.ctaSection.title.am },
      desc: { en: api.ctaSection.desc.en || t.home.ctaSection.desc.en, am: api.ctaSection.desc.am || t.home.ctaSection.desc.am },
      partnershipBtn: { en: api.ctaSection.partnershipBtn.en, am: api.ctaSection.partnershipBtn.am },
      inquiryBtn: { en: api.ctaSection.inquiryBtn.en, am: api.ctaSection.inquiryBtn.am },
    },
  } : t.home;

  return (
    <>
      <HeroSection heroSection={h.heroSection} lang={lang} />

      <ScrollReveal>
        <section className="bg-white pt-8 md:pt-12 pb-16 md:pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f7f4] hidden lg:block"></div>
          <div className="container-custom relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase block mb-4">{h.mission.label[lang]}</span>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-navy-900 leading-tight">{h.mission.title[lang]}</h2>
                <div className="w-16 h-1 bg-gold-400 mt-6"></div>
              </div>
              <div className="space-y-6">
                <p className="text-navy-700/80 text-lg leading-relaxed whitespace-pre-line text-justify">{h.mission.desc[lang]}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#f5f4ef] py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.pillars.label[lang]}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mt-3">{h.pillars.title[lang]}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <Link key={pillar.key} href={pillar.href} className="block">
                    <NumberedCard number={i + 1} className="flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300" style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}>
                        <IconComponent size={26} />
                      </div>
                      <h3 className="text-navy-700/70 text-sm font-bold uppercase tracking-wide leading-snug mb-3">{tr({ en: pillar.titleEn, am: pillar.titleAm }, lang)}</h3>
                      <span className="view-detail">
                        {lang === 'en' ? 'View Detail' : 'ዝርዝር ይመልከቱ'}
                        <ArrowRight size={12} className="arrow" />
                      </span>
                    </NumberedCard>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#081144] text-white py-16 md:py-24">
          <div className="container-custom text-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{h.flagshipProject.label[lang]}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-12">{h.flagshipProject.title[lang]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {(h.flagshipProject.stats || []).map((stat, i) => (
                <div key={i} className="border-t border-gold-500/30 pt-8">
                  <AnimatedCounter value={stat.value} unit={stat.unit[lang]} />
                  <p className="text-white/50 text-sm uppercase tracking-widest font-mono">{stat.label[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.values.label[lang]}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mt-3">{h.values.title[lang]}</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <NumberedCard key={val.titleEn} number={i + 1}>
                    <div className="w-8 h-0.5 bg-navy-900 mb-4" />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0 rounded-full" style={{ backgroundColor: '#2e7d3215' }}>
                        <Icon size={16} className="text-forest-500" />
                      </div>
                      <h3 className="font-bold text-navy-900 text-base group-hover:text-gold-600 transition-colors">{tr({ en: val.titleEn, am: val.titleAm }, lang)}</h3>
                    </div>
                    <p className="text-navy-700/60 text-sm md:text-base leading-relaxed">{tr({ en: val.descEn, am: val.descAm }, lang)}</p>
                  </NumberedCard>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-gradient-to-r from-forest-600 to-navy-700 text-white py-16 md:py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/60 uppercase">{lang === 'en' ? 'ESG & Sustainability' : 'ኢኤስጂ እና ዘላቂነት'}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">{lang === 'en' ? 'Committed to a Sustainable Future' : 'ለዘላቂ የወደፊት እጣ ፈንታ የተወሰነ'}</h2>
                <p className="text-white/70">{lang === 'en' ? (t.brand.short.en + ' is committed to sustainable development through responsible engineering, environmental stewardship, and efficient resource management. We build today with a focus on protecting tomorrow.') : (t.brand.short.am + ' በኃላፊነት በተሞላ ምህንድስና፣ በአካባቢ ጥበቃ እና ቀልጣፋ የሀብት አያያዝ ዘላቂ ልማት ለማምጣት ቁርጠኛ ነው። የነገን ለመጠበቅ በማሰብ ዛሬ እንገነባለን።')}</p>
              </div>
              <Link href="/about#esg" className="btn-outline border-white text-white hover:bg-white hover:text-forest-600 whitespace-nowrap shrink-0">
                <span>{h.esg.cta[lang]}</span><ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-[#f5f4ef]">
          <div className="container-custom text-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{h.partners.label[lang]}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-12">{h.partners.title[lang]}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partnerNames.map((partner, i) => (
                <NumberedCard key={partner.en} number={i + 1} className="flex items-center justify-center text-center">
                  <p className="text-navy-700/70 text-sm font-bold uppercase tracking-wide leading-snug">{tr(partner, lang)}</p>
                </NumberedCard>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#0a1a6b] text-white py-16 md:py-24">
          <div className="container-custom text-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{lang === 'en' ? ('Work With ' + t.brand.short.en) : ('ከ' + t.brand.short.am + ' ጋር ይስሩ')}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 max-w-3xl mx-auto">{lang === 'en' ? 'Building Strong Partnerships' : 'ጠንካራ አጋርነቶችን መገንባት'}</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">{lang === 'en' ? ('Whether you are a government organization, private investor, development partner, or financial institution, ' + t.brand.short.en + ' delivers reliable expertise, local knowledge, and trusted project execution to help turn ambitious ideas into lasting results.') : ('የመንግስት ድርጅት፣ የግል ባለሀብት፣ የልማት አጋር፣ ወይም የፋይናንስ ተቋም ብትሆኑ፣ ' + t.brand.short.am + ' ምኞት ያላቸውን ሃሳቦች ወደ ዘላቂ ውጤቶች ለመቀየር አስተማማኝ እውቀት፣ የአካባቢ እውቀት እና የታመነ የፕሮጀክት አፈጻጸም ያቀርባል።')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?inquiry=partnership" className="btn-primary text-sm"><span>{h.ctaSection.partnershipBtn[lang]}</span><ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <RecentNewsSection />
    </>
  );
}
