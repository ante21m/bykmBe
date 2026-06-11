'use client';

import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';

const milestones = [
  {
    number: '01',
    year: '2014 EC',
    title: { en: 'The Beginning', am: 'መጀመሪያ' },
    desc: {
      en: 'Established as a Grade-4 Building Contractor, pioneering urban transformation in Addis Ababa with engineering precision and First Mover spirit.',
      am: 'እንደ ክፍል-4 የሕንፃ ኮንትራክተር ተቋቁሞ፣ በምህንድስና ትክክለኛነት እና አቅኚ መንፈስ በአዲስ አበባ የከተማ ለውጥን አቅንቷል።',
    },
    ribbonBg: 'bg-[#0B0F5A]',
    ribbonText: 'text-[#FFD32A]',
    accentBg: 'bg-[#0B0F5A]',
  },
  {
    number: '02',
    year: '2018–2020',
    title: { en: 'Mega-Corridor Project', am: 'ሜጋ-ኮሪደር ፕሮጀክት' },
    desc: {
      en: 'Delivered 20.5km of integrated urban corridors for Addis Ababa\'s CBD — 15 days ahead of schedule — establishing BYKM\'s reputation for excellence.',
      am: 'ለአዲስ አበባ CBD 20.5 ኪሎ ሜትር የተቀናጀ የከተማ ኮሪደሮችን አድርሷል — ከቀጠሮው 15 ቀናት ቀደም ብሎ — የBYKMን የላቀነት ስም አስመሥርቷል።',
    },
    ribbonBg: 'bg-[#146B1F]',
    ribbonText: 'text-white',
    accentBg: 'bg-[#146B1F]',
  },
  {
    number: '03',
    year: '2019–2021',
    title: { en: 'Living Infrastructure', am: 'የቀጥታ መሠረተ ልማት' },
    desc: {
      en: 'Pioneered Living Infrastructure: transforming erosion-prone waterways into Urban Green Lungs, integrating 50,000+ sqm of indigenous flora.',
      am: 'የቀጥታ መሠረተ ልማትን አቅንቷል፦ ለአፈር መሸርሸር የተጋለጡ የውሃ መስመሮችን ወደ ከተማ አረንጓዴ ሳንባዎች መቀየር፣ ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋትን በማዋሃድ።',
    },
    ribbonBg: 'bg-[#0B0F5A]',
    ribbonText: 'text-[#FFD32A]',
    accentBg: 'bg-[#0B0F5A]',
  },
  {
    number: '04',
    year: '2018 GC',
    title: { en: 'Strategic Transition to BYKM Trading PLC', am: 'ወደ BYKM ትሬዲንግ ፒኤልሲ ስትራቴጂካዊ ሽግግር' },
    desc: {
      en: 'Evolved from specialized contractor to diversified multi-sectoral powerhouse, spanning five integrated business pillars for a Modern Ethiopia.',
      am: 'ከልዩ ኮንትራክተርነት ወደ ተለያዩ ዘርፎች የተስፋፋ ኃያል ኃይል ተለወጠ፣ ለዘመናዊቷ ኢትዮጵያ አምስት የተቀናጁ የንግድ ምሰሶዎችን ያካተተ።',
    },
    ribbonBg: 'bg-[#146B1F]',
    ribbonText: 'text-white',
    accentBg: 'bg-[#146B1F]',
  },
  {
    number: '05',
    year: '2024–2030',
    title: { en: 'Multi-Sector Expansion', am: 'የባለብዙ ዘርፍ መስፋፋት' },
    desc: {
      en: 'Coffee Export Initiative, Digital Infrastructure Pivot, Retail Network Expansion, and Industrial Value-Addition Hubs all in active execution.',
      am: 'የቡና ኤክስፖርት ተነሳሽነት፣ የዲጂታል መሠረተ ልማት ማዞሪያ፣ የችርቻሮ አውታር ማስፋፊያ እና የኢንዱስትሪ እሴት ተጨማሪ ማዕከላት ሁሉም በንቁ ትግበራ ላይ ናቸው።',
    },
    ribbonBg: 'bg-[#0B0F5A]',
    ribbonText: 'text-[#FFD32A]',
    accentBg: 'bg-[#0B0F5A]',
  },
];

const evolutionCards = [
  {
    number: '01',
    label: { en: 'The Foundation', am: 'መሠረቱ' },
    paragraphs: {
      en: [
        'The foundation of BYKM is built upon a legacy of technical excellence. Our journey began with Besufekad BC, where we established ourselves as "First Movers" in Ethiopia\'s urban transformation.',
        'As a Grade-4 General Contractor, we proved our operational velocity and technical precision through landmark projects, most notably the Addis Ababa Mega-Corridor Project, delivering critical urban infrastructure ahead of national deadlines.',
      ],
      am: [
        'የBYKM መሠረት በቴክኒክ የላቀነት ውርስ ላይ የተገነባ ነው።',
        'እንደ ክፍል-4 አጠቃላይ ኮንትራክተር፣ የአዲስ አበባ ሜጋ-ኮሪደር ፕሮጀክትን ጨምሮ በታዋቂ ፕሮጀክቶች አማካኝነት የአሰራር ፍጥነታችንን እና የቴክኒክ ትክክለኛነታችንን አሳይተናል።',
      ],
    },
    ribbonBg: 'bg-[#0B0F5A]',
    ribbonText: 'text-[#FFD32A]',
    accentBg: 'bg-[#0B0F5A]',
  },
  {
    number: '02',
    label: { en: 'The Strategic Transition', am: 'ስትራቴጂካዊ ሽግግሩ' },
    paragraphs: {
      en: [
        'Recognizing that a modern nation requires an integrated economic approach, we evolved into BYKM Trading PLC. This strategic transition expanded our mandate from specialized construction to a diversified ecosystem.',
        'Today, we operate across five strategic pillars — Infrastructure, Global Trade, the Digital Economy, Agro-Industrialization, and Hospitality — creating a closed-loop value chain that maximizes efficiency and minimizes import reliance.',
      ],
      am: [
        'ዘመናዊ ሀገር የተቀናጀ ኢኮኖሚያዊ አቀራረብ እንደሚያስፈልገው በመገንዘብ ወደ BYKM ትሬዲንግ ፒኤልሲ ተለውጠናል።',
        'ዛሬ በአምስት ስትራቴጂካዊ ምሰሶዎች ላይ እንሰራለን — መሠረተ ልማት፣ ዓለም አቀፍ ንግድ፣ ዲጂታል ኢኮኖሚ፣ አግሮ-ኢንዱስትሪላይዜሽን እና ሆስፒታሊቲ — ቅልጥፍናን ከፍ የሚያደርግ የተዘጋ ዑደት የእሴት ሰንሰለት ይፈጥራል።',
      ],
    },
    ribbonBg: 'bg-[#146B1F]',
    ribbonText: 'text-white',
    accentBg: 'bg-[#146B1F]',
  },
  {
    number: '03',
    label: { en: 'The Engineering Mindset', am: 'የምህንድስና አስተሳሰብ' },
    paragraphs: {
      en: [
        'At the core of our corporate identity is the Engineering Mindset. We believe that the discipline of structural engineering precision, risk mitigation, and scalability should be applied to every business sector.',
        'Whether we are roasting premium coffee for export, developing smart-city infrastructure, or managing digital networks, we approach every venture with the same rigorous technical accuracy. This philosophy ensures that BYKM does not just enter markets; we stabilize them and scale them with uncompromising quality.',
      ],
      am: [
        'የኮርፖሬት ማንነታችን ዋና አካል የምህንድስና አስተሳሰብ ነው። የመዋቅራዊ ምህንድስና ትክክለኛነት፣ የአደጋ ቅነሳ እና የመጠን አቅም ተግሣጽ በሁሉም የንግድ ዘርፎች ላይ መተግበር እንዳለበት እናምናለን።',
        'ይህ ፍልስፍና BYKM ወደ ገበያ ብቻ የሚገባ ሳይሆን ገበያዎችን የሚያረጋጋ እና የማይታጠፍ ጥራት የሚያሳድግ መሆኑን ያረጋግጣል።',
      ],
    },
    ribbonBg: 'bg-[#0B0F5A]',
    ribbonText: 'text-[#FFD32A]',
    accentBg: 'bg-[#0B0F5A]',
  },
];

export function HistoryContent() {
  const { lang, translations: t } = useTranslation();
  const a = t.about;

  return (
    <>
      <section className="relative overflow-hidden bg-[#080616] text-white pt-28 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="geo-shape w-72 h-72 top-10 right-[-60px] rotate-12 opacity-30" />
        <div className="geo-shape w-40 h-40 bottom-16 right-32 rotate-6 opacity-15" />
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{a.timeline.label[lang]}</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{a.timeline.title[lang]}</h1>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-20 bg-[#F3F3F3]">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((item, i) => (
                <div
                  key={i}
className="group relative bg-[#F3F3F3] border border-[#D9D9D9] px-[80px] py-[50px] h-full hover:-translate-y-[6px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-[#146B1F]" />
                    <div className={`absolute top-[-12px] right-[-20px] w-[110px] h-[65px] ${item.ribbonBg} ${item.ribbonText} flex items-center justify-center text-4xl font-bold -skew-x-[30deg]`}>
                    <span className="skew-x-[30deg]">{item.number}</span>
                  </div>
                  <div className={`w-[60px] h-[5px] ${item.accentBg} mb-[30px]`} />
                  <h3 className="font-display text-[2rem] font-bold text-[#0B0F5A] mb-5">{lang === 'en' ? item.title.en : item.title.am}</h3>
                  <p className="text-[#5E6897] text-[1.35rem] leading-[1.9] text-justify">{lang === 'en' ? item.desc.en : item.desc.am}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#F3F3F3] py-20">
          <div className="container-custom">
            <div className="text-center mb-14">
              <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-[#146B1F] uppercase">{a.executive.label[lang]}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0F5A] mt-3">{a.executive.title[lang]}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {evolutionCards.map((card) => (
                <div
                  key={card.number}
                  className="group relative bg-[#F3F3F3] border border-[#D9D9D9] px-[80px] py-[50px] h-full hover:-translate-y-[6px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-[#146B1F]" />
                  <div className={`absolute top-[-12px] right-[-20px] w-[110px] h-[65px] ${card.ribbonBg} ${card.ribbonText} flex items-center justify-center text-4xl font-bold -skew-x-[30deg]`}>
                    <span className="skew-x-[30deg]">{card.number}</span>
                  </div>
                  <div className={`w-[60px] h-[5px] ${card.accentBg} mb-[30px]`} />
                  <h3 className="font-display text-[2rem] font-bold text-[#0B0F5A] mb-5">{lang === 'en' ? card.label.en : card.label.am}</h3>
                  <div className="space-y-4">
                    {(lang === 'en' ? card.paragraphs.en : card.paragraphs.am).map((p, pi) => (
                      <p key={pi} className="text-[#5E6897] text-[1.35rem] leading-[1.9] text-justify">{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
