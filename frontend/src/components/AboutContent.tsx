'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';

const timeline = [
  { year: '2014 EC', titleEn: 'Founded as Besufekad BC', titleAm: 'እንደ በሱፍቃድ ቢሲ ተመሠረተ', descEn: 'Established as a Grade-4 Building Contractor, pioneering urban transformation in Addis Ababa with engineering precision and First Mover spirit.', descAm: 'እንደ ክፍል-4 የሕንፃ ኮንትራክተር ተቋቁሞ፣ በምህንድስና ትክክለኛነት እና አቅኚ መንፈስ በአዲስ አበባ የከተማ ለውጥን አቅንቷል።' },
  { year: '2018–2020', titleEn: 'Mega-Corridor Project', titleAm: 'ሜጋ-ኮሪደር ፕሮጀክት', descEn: 'Delivered 20.5km of integrated urban corridors for Addis Ababa\'s CBD — 15 days ahead of schedule — establishing BYKM\'s reputation for excellence.', descAm: 'ለአዲስ አበባ CBD 20.5 ኪሎ ሜትር የተቀናጀ የከተማ ኮሪደሮችን አድርሷል — ከቀጠሮው 15 ቀናት ቀደም ብሎ — የBYKMን የላቀነት ስም አስመሥርቷል።' },
  { year: '2019–2021', titleEn: 'Green Legacy Initiative', titleAm: 'አረንጓዴ አሻራ ተነሳሽነት', descEn: 'Pioneered Living Infrastructure: transforming erosion-prone waterways into Urban Green Lungs, integrating 50,000+ sqm of indigenous flora.', descAm: 'የቀጥታ መሠረተ ልማትን አቅንቷል፦ ለአፈር መሸርሸር የተጋለጡ የውሃ መስመሮችን ወደ ከተማ አረንጓዴ ሳንባዎች መቀየር፣ ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋትን በማዋሃድ።' },
  { year: '2018 GC', titleEn: 'Strategic Transition to BYKM Trading PLC', titleAm: 'ወደ BYKM ትሬዲንግ ፒኤልሲ ስትራቴጂካዊ ሽግግር', descEn: 'Evolved from specialized contractor to diversified multi-sectoral powerhouse, spanning five integrated business pillars for a Modern Ethiopia.', descAm: 'ከልዩ ኮንትራክተርነት ወደ ተለያዩ ዘርፎች የተስፋፋ ኃያል ኃይል ተለወጠ፣ ለዘመናዊቷ ኢትዮጵያ አምስት የተቀናጁ የንግድ ምሰሶዎችን ያካተተ።' },
  { year: '2024–2030', titleEn: 'Vision 2030 Active Execution', titleAm: 'ራዕይ 2030 ንቁ ትግበራ', descEn: 'Coffee Export Initiative, Digital Infrastructure Pivot, Retail Network Expansion, and Industrial Value-Addition Hubs all in active execution.', descAm: 'የቡና ኤክስፖርት ተነሳሽነት፣ የዲጂታል መሠረተ ልማት ማዞሪያ፣ የችርቻሮ አውታር ማስፋፊያ እና የኢንዱስትሪ እሴት ተጨማሪ ማዕከላት ሁሉም በንቁ ትግበራ ላይ ናቸው።' },
];

const esgGoals = [
  { pillarEn: 'Environmental', pillarAm: 'አካባቢ', color: 'bg-forest-500', goalEn: 'Execute 100km of carbon-neutral urban infrastructure', goalAm: '100 ኪሎ ሜትር የካርቦን-ገለልተኛ የከተማ መሠረተ ልማት መሥራት', commitmentEn: 'Green Legacy Alignment', commitmentAm: 'አረንጓዴ አሻራ አቀማመጥ' },
  { pillarEn: 'Social', pillarAm: 'ማህበራዊ', color: 'bg-navy-600', goalEn: 'Create 5,000+ sustainable career opportunities', goalAm: 'ከ5,000 በላይ ዘላቂ የሙያ ዕድሎችን መፍጠር', commitmentEn: 'Human Capital Empowerment', commitmentAm: 'የሰው ካፒታል አቅም ማጎልበት' },
  { pillarEn: 'Governance', pillarAm: 'አስተዳደር', color: 'bg-gold-500', goalEn: 'Achieve 100% ISO-compliance, Grade-1 status', goalAm: '100% የISO ተገዢነት፣ የደረጃ-1 ደረጃ ማሳካት', commitmentEn: 'Ethical & Technical Excellence', commitmentAm: 'ሥነ-ምግባራዊ እና ቴክኒክ የላቀነት' },
  { pillarEn: 'Economic', pillarAm: 'ኢኮኖሚያዊ', color: 'bg-navy-800', goalEn: '40% increase in local value-addition by 2027', goalAm: 'በ2027 የአገር ውስጥ እሴት ተጨማሪ 40% መጨመር', commitmentEn: 'Industrial Sovereignty', commitmentAm: 'ኢንዱስትሪያል ሉዓላዊነት' },
];

const isoStandards = [
  { std: 'ISO 9001:2015', areaEn: 'Quality', areaAm: 'ጥራት', strategyEn: 'TQM & Kaizen', strategyAm: 'TQM እና ካይዘን' },
  { std: 'ISO 45001:2018', areaEn: 'Safety', areaAm: 'ደህንነት', strategyEn: 'Behavior-Based Safety & Zero-Harm', strategyAm: 'በባህርይ ላይ የተመሠረተ ደህንነት እና ዜሮ-ጉዳት' },
  { std: 'ISO 14001:2015', areaEn: 'Environment', areaAm: 'አካባቢ', strategyEn: 'Active Reforestation & Circular Economy', strategyAm: 'ንቁ የደን መልሶ ማልማት እና ክብ ኢኮኖሚ' },
  { std: 'ISO 20400', areaEn: 'Procurement', areaAm: 'ግዥ', strategyEn: 'Vertical Integration & Ethical Sourcing', strategyAm: 'አቀባዊ ውህደት እና ሥነ-ምግባራዊ ምንጭ ማፈላለግ' },
];

const statutoryRows = [
  { dtEn: 'Legal Entity', dtAm: 'ህጋዊ አካል', dd: 'Private Limited Company (P.L.C.)' },
  { dtEn: 'Registration', dtAm: 'ምዝገባ', dd: 'AACATB/2/0257491/2018' },
  { dtEn: 'Paid-up Capital', dtAm: 'የተከፈለ ካፒታል', dd: 'More than 10,000,000.00 ETB' },
  { dtEn: 'TIN', dtAm: 'ቲን', dd: '0103921383' },
  { dtEn: 'VAT No.', dtAm: 'የቫት ቁጥር', dd: '35205580010' },
  { dtEn: 'Tax Category', dtAm: 'የግብር ምድብ', dd: 'Category "A" Taxpayer' },
  { dtEn: 'Technical Grade', dtAm: 'ቴክኒክ ደረጃ', dd: 'Grade-4 General Contractor (GC-4)' },
  { dtEn: 'Certificate', dtAm: 'የምስክር ወረቀት', dd: 'CON/32486 · Ethiopian Construction Authority' },
  { dtEn: 'General Manager', dtAm: 'አጠቃላይ ሥራ አስኪያጅ', dd: 'Eng. Besufekad Molla Wube' },
  { dtEn: 'Deputy GM', dtAm: 'ምክትል ሥራ አስኪያጅ', dd: 'W/ro Yeshiye Semeňew Bogale' },
];

const governanceLevels = [
  { level: 'Level I', titleEn: 'Sovereign Authority', titleAm: 'ሉዓላዊ ባለስልጣን', subtitleEn: 'The General Assembly', subtitleAm: 'ጠቅላላ ጉባኤ', descEn: 'Supreme governing body setting long-term vision, approving capital investments, maintaining founding MoA alignment with 3/4 capital quorum requirement.', descAm: 'የረዥም ጊዜ ራዕይን የሚያወጣ፣ የካፒታል ኢንቨስትመንቶችን የሚያጸድቅ፣ ከ3/4 ካፒታል የምልአተ ጉባኤ መስፈርት ጋር የማቋቋሚያ ሞአ አሰላለፍን የሚጠብቅ ከፍተኛ የአስተዳደር አካል።' },
  { level: 'Level II', titleEn: 'Executive Command', titleAm: 'አስፈጻሚ ትዕዛዝ', subtitleEn: 'GM & Deputy GM', subtitleAm: 'ሥራ አስኪያጅ እና ምክትል ሥራ አስኪያጅ', descEn: 'General Manager Eng. Besufekad Molla Wube and Deputy GM W/ro Yeshiye Semeňew Bogale translate vision into actionable strategy.', descAm: 'አጠቃላይ ሥራ አስኪያጅ ኢንጂነር በሱፍቃድ ሞላ ዉቤ እና ምክትል ሥራ አስኪያጅ ወ/ሮ የሺየ ሰማነው ቦጋሌ ራእይን ወደ ተግባራዊ ስትራቴጂ ይተረጉማሉ።' },
  { level: 'Level III', titleEn: 'Sectoral Execution', titleAm: 'የዘርፍ አፈጻጸም', subtitleEn: 'Sector Managers & Shared Services', subtitleAm: 'የዘርፍ አስተዳዳሪዎች እና የጋራ አገልግሎቶች', descEn: 'Specialized managers drive KPIs across five clusters, supported by Finance, Audit, and Asset Management.', descAm: 'ልዩ አስተዳዳሪዎች በአምስቱ ክላስተሮች ውስጥ ኬፒአይዎችን ያሽከረክራሉ፣ በፋይናንስ፣ ኦዲት እና ንብረት አስተዳደር የተደገፉ።' },
];

const missionItemsEn = [
  'Unlocking Wealth — 40% value-addition increase by 2027',
  'Building Resiliency — Green, high-durability infrastructure by 2030',
  'Connecting Markets — Three digital trade pivots by 2028',
  'Empowering People — 5,000+ career opportunities by 2030',
];

const missionItemsAm = [
  'ሀብትን መክፈት — በ2027 40% የእሴት ተጨማሪ መጨመር',
  'መቋቋምን መገንባት — በ2030 አረንጓዴ፣ ከፍተኛ ጥንካሬ ያለው መሠረተ ልማት',
  'ገበያዎችን ማገናኘት — በ2028 ሶስት ዲጂታል የንግድ ለውጦች',
  'ሰዎችን ማብቃት — በ2030 ከ5,000 በላይ የሙያ ዕድሎች',
];

const isoHeadersEn = ['Pillar', 'Benchmark', 'BYKM Strategy'];
const isoHeadersAm = ['ምሰሶ', 'መለኪያ', 'የቢኬኤም ስትራቴጂ'];

export function AboutContent() {
  const { lang, translations: t } = useTranslation();
  const a = t.about;

  return (
    <>
      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#080616] text-white pt-40 pb-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,8,30,0.6)_0%,transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="geo-shape w-72 h-72 top-10 right-[-60px] rotate-12 opacity-30" />
          <div className="geo-shape w-40 h-40 bottom-16 right-32 rotate-6 opacity-15" />
          <div className="geo-shape w-24 h-24 top-1/3 right-1/4 opacity-10" />
          <div className="container-custom relative z-10">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{a.header.label[lang]}</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{a.header.title[lang]}</h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">{a.header.desc[lang]}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{a.executive.label[lang]}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-6">{a.executive.title[lang]}</h2>
                <div className="space-y-4 text-navy-700/70 leading-relaxed">
                  <p>{a.executive.p1[lang]} <strong className="text-navy-900">{a.executive.p1Bold[lang]}</strong>{a.executive.p1End[lang]}</p>
                  <p>{a.executive.p2[lang]}</p>
                  <p>{a.executive.p3[lang]}</p>
                </div>
              </div>
              <div className="bg-[#f5f4ef] p-8">
                <h3 className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase mb-6">{a.executive.statutoryTitle[lang]}</h3>
                <dl className="space-y-4">
                  {statutoryRows.map((row) => (
                    <div key={row.dtEn} className="flex gap-4 text-sm border-b border-navy-100 pb-3">
                      <dt className="text-navy-700/50 font-bold w-32 shrink-0">{lang === 'en' ? row.dtEn : row.dtAm}</dt>
                      <dd className="text-navy-900 font-mono">{row.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative overflow-hidden section-padding bg-[#080616] text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="geo-shape w-56 h-56 top-10 right-[-40px] rotate-12 opacity-25" />
          <div className="geo-shape w-32 h-32 bottom-10 left-1/4 rotate-45 opacity-10" />
          <div className="container-custom relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-navy-900/60 border border-white/10 p-8">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{a.visionMission.visionLabel[lang]}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4 mb-4">{a.visionMission.visionTitle[lang]}</h2>
                <p className="text-white/60 leading-relaxed">{a.visionMission.visionDesc[lang]}</p>
              </div>
              <div className="bg-gradient-to-br from-forest-600/20 to-navy-900/60 border border-forest-500/20 p-8">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{a.visionMission.missionLabel[lang]}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4 mb-4">{a.visionMission.missionTitle[lang]}</h2>
                <ul className="space-y-3">
                  {(lang === 'en' ? missionItemsEn : missionItemsAm).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-white/70">
                      <CheckCircle2 size={18} className="text-forest-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-[#f5f4ef]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{a.timeline.label[lang]}</span>
              <h2 className="font-display text-4xl font-bold text-navy-900 mt-3">{a.timeline.title[lang]}</h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-navy-600 to-forest-500" />
              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-navy-600 to-forest-500 border-2 border-[#f5f4ef]" />
                    <span className="font-mono text-xs text-gold-600 tracking-wider">{item.year}</span>
                    <h3 className="font-display text-xl font-bold text-navy-900 mt-1 mb-2">{lang === 'en' ? item.titleEn : item.titleAm}</h3>
                    <p className="text-navy-700/60 text-base leading-relaxed">{lang === 'en' ? item.descEn : item.descAm}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="esg" className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{a.esg.label[lang]}</span>
              <h2 className="font-display text-4xl font-bold text-navy-900 mt-3">{a.esg.title[lang]}</h2>
              <p className="text-navy-700/60 mt-4 max-w-2xl mx-auto">{a.esg.desc[lang]}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {esgGoals.map((item) => (
                <div key={item.pillarEn} className="border border-navy-100 p-6 hover-lift bg-white">
                  <div className={`w-2 h-10 ${item.color} mb-4`} />
                  <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-navy-700/50">{lang === 'en' ? item.pillarEn : item.pillarAm}</span>
                  <p className="font-bold text-navy-900 text-base mt-2 mb-1">{lang === 'en' ? item.commitmentEn : item.commitmentAm}</p>
                  <p className="text-navy-700/60 text-sm leading-relaxed">{lang === 'en' ? item.goalEn : item.goalAm}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">{a.esg.isoTitle[lang]}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#080616] text-white">
                      <th className="text-left p-4 font-mono text-xs sm:text-sm tracking-wider uppercase">{(lang === 'en' ? isoHeadersEn : isoHeadersAm)[0]}</th>
                      <th className="text-left p-4 font-mono text-xs sm:text-sm tracking-wider uppercase">{(lang === 'en' ? isoHeadersEn : isoHeadersAm)[1]}</th>
                      <th className="text-left p-4 font-mono text-xs sm:text-sm tracking-wider uppercase">{(lang === 'en' ? isoHeadersEn : isoHeadersAm)[2]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isoStandards.map((row, i) => (
                      <tr key={row.std} className={i % 2 === 0 ? 'bg-[#f5f4ef]' : 'bg-white'}>
                        <td className="p-4 font-bold text-navy-900">{lang === 'en' ? row.areaEn : row.areaAm}</td>
                        <td className="p-4 font-mono text-gold-600">{row.std}</td>
                        <td className="p-4 text-navy-700/70">{lang === 'en' ? row.strategyEn : row.strategyAm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative overflow-hidden section-padding bg-[#080616] text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_50%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="geo-shape w-64 h-64 -top-20 right-[-30px] rotate-12 opacity-20" />
          <div className="geo-shape w-36 h-36 bottom-1/4 left-[-20px] rotate-45 opacity-10" />
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{a.leadership.label[lang]}</span>
              <h2 className="font-display text-4xl font-bold mt-3">{a.leadership.title[lang]}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {governanceLevels.map((item) => (
                <div key={item.level} className="bg-navy-900/60 border border-white/10 p-8">
                  <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{item.level}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-3 mb-1">{lang === 'en' ? item.titleEn : item.titleAm}</h3>
                  <p className="text-forest-400 text-base mb-4">{lang === 'en' ? item.subtitleEn : item.subtitleAm}</p>
                  <p className="text-white/50 text-base leading-relaxed">{lang === 'en' ? item.descEn : item.descAm}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-gradient-to-r from-forest-600 to-navy-700 text-white py-20">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{a.cta.title[lang]}</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">{a.cta.desc[lang]}</p>
            <Link href="/contact" className="btn-primary"><span>{a.cta.cta[lang]}</span><ArrowRight size={16} /></Link>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
