'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';

const timeline = [
  { year: '2014 EC', titleEn: 'Founded as Besufekad BC', titleAm: 'እንደ በሱፍቃድ ቢሲ ተመሠረተ', descEn: 'Established as a Grade-4 Building Contractor, pioneering urban transformation in Addis Ababa with engineering precision and First Mover spirit.', descAm: 'እንደ ክፍል-4 የሕንፃ ኮንትራክተር ተቋቁሞ፣ በምህንድስና ትክክለኛነት እና አቅኚ መንፈስ በአዲስ አበባ የከተማ ለውጥን አቅንቷል።' },
  { year: '2018–2020', titleEn: 'Mega-Corridor Project', titleAm: 'ሜጋ-ኮሪደር ፕሮጀክት', descEn: 'Delivered 20.5km of integrated urban corridors for Addis Ababa\'s CBD — 15 days ahead of schedule — establishing BYKM\'s reputation for excellence.', descAm: 'ለአዲስ አበባ CBD 20.5 ኪሎ ሜትር የተቀናጀ የከተማ ኮሪደሮችን አድርሷል — ከቀጠሮው 15 ቀናት ቀደም ብሎ — የBYKMን የላቀነት ስም አስመሥርቷል።' },
  { year: '2019–2021', titleEn: 'Green Legacy Initiative', titleAm: 'አረንጓዴ አሻራ ተነሳሽነት', descEn: 'Pioneered Living Infrastructure: transforming erosion-prone waterways into Urban Green Lungs, integrating 50,000+ sqm of indigenous flora.', descAm: 'የቀጥታ መሠረተ ልማትን አቅንቷል፦ ለአፈር መሸርሸር የተጋለጡ የውሃ መስመሮችን ወደ ከተማ አረንጓዴ ሳንባዎች መቀየር፣ ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋትን በማዋሃድ።' },
  { year: '2018 GC', titleEn: 'Strategic Transition to BYKM Trading PLC', titleAm: 'ወደ BYKM ትሬዲንግ ፒኤልሲ ስትራቴጂካዊ ሽግግር', descEn: 'Evolved from specialized contractor to diversified multi-sectoral powerhouse, spanning five integrated business pillars for a Modern Ethiopia.', descAm: 'ከልዩ ኮንትራክተርነት ወደ ተለያዩ ዘርፎች የተስፋፋ ኃያል ኃይል ተለወጠ፣ ለዘመናዊቷ ኢትዮጵያ አምስት የተቀናጁ የንግድ ምሰሶዎችን ያካተተ።' },
  { year: '2024–2030', titleEn: 'Vision 2030 Active Execution', titleAm: 'ራዕይ 2030 ንቁ ትግበራ', descEn: 'Coffee Export Initiative, Digital Infrastructure Pivot, Retail Network Expansion, and Industrial Value-Addition Hubs all in active execution.', descAm: 'የቡና ኤክስፖርት ተነሳሽነት፣ የዲጂታል መሠረተ ልማት ማዞሪያ፣ የችርቻሮ አውታር ማስፋፊያ እና የኢንዱስትሪ እሴት ተጨማሪ ማዕከላት ሁሉም በንቁ ትግበራ ላይ ናቸው።' },
];

const greenLegacyText = {
  en: 'We believe that industrial progress is meaningless if it compromises the environment. As a steadfast partner in Ethiopia\'s National Green Legacy Initiative, BYKM pioneers "Living Infrastructure." By integrating ecological restoration into our construction and mining protocols, we ensure that every project we execute contributes to the biodiversity and environmental health of our nation.',
  am: 'ኢንዱስትሪያል እድገት አካባቢን የሚጎዳ ከሆነ ትርጉም የለሽ ነው ብለን እናምናለን። የኢትዮጵያ ብሔራዊ አረንጓዴ አሻራ ተነሳሽነት ታማኝ አጋር እንደመሆናችን፣ BYKM "የቀጥታ መሠረተ ልማት"ን በአቅኚነት ያስተዋውቃል።',
};


const governanceDesc = {
  en: 'BYKM operates under a rigorous framework of transparency, statutory compliance, and fiscal discipline. As a Category "A" taxpayer and a legally chartered PLC, we provide our partners, financial institutions, and international joint-venture consortia with the absolute confidence of solvency, reliability, and institutional integrity.',
  am: 'BYKM በግልጽነት፣ በህጋዊ ተገዢነት እና በበጀት ተግሣጽ ጥብቅ ማዕቀፍ ውስጥ ይሰራል። እንደ ምድብ "A" ግብር ከፋይ እና በህጋዊ መንገድ የተመዘገበ ኃላፊነቱ የተወሰነ የግል ማህበር፣ ለአጋሮቻችን፣ ለፋይናንስ ተቋማት እና ለአለም አቀፍ የጋራ ቬንቸር ኮንሰርቲያ የመክፈል አቅም፣ አስተማማኝነት እና ተቋማዊ ታማኝነት ሙሉ እምነት እንሰጣለን።',
};

const missionCards = [
  { icon: '💰', titleEn: 'Unlocking Wealth', titleAm: 'ሀብትን መክፈት', statEn: '+40% value-add by 2027', statAm: 'በ2027 +40% የእሴት ተጨማሪ' },
  { icon: '🏗️', titleEn: 'Building Resiliency', titleAm: 'መቋቋምን መገንባት', statEn: 'Green infra by 2030', statAm: 'በ2030 አረንጓዴ መሠረተ ልማት' },
  { icon: '🌐', titleEn: 'Connecting Markets', titleAm: 'ገበያዎችን ማገናኘት', statEn: '3 digital pivots by 2028', statAm: 'በ2028 3 ዲጂታል ለውጦች' },
  { icon: '👥', titleEn: 'Empowering People', titleAm: 'ሰዎችን ማብቃት', statEn: '5,000+ careers by 2030', statAm: 'በ2030 ከ5,000 በላይ ሙያዎች' },
];

export function AboutContent() {
  const { lang, translations: t } = useTranslation();
  const a = t.about;

  return (
    <>
      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#080616] text-white pt-28 pb-16">
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
            <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{a.header.label[lang]}</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{a.header.title[lang]}</h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed text-justify">{a.header.desc[lang]}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div>
                <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-forest-600 uppercase">{a.executive.label[lang]}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-10">{a.executive.title[lang]}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative bg-white border border-navy-100 border-t-4 border-t-forest-700 p-6 hover-lift group flex flex-col">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-navy-900 -skew-x-[30deg] -translate-y-1/2 translate-x-4 flex items-center justify-center">
                      <span className="skew-x-[30deg] text-gold-400 font-bold text-lg">01</span>
                    </div>
                    <div className="mt-4 flex-1 flex flex-col">
                      <div className="w-10 h-1 bg-navy-900 mb-4" />
                      <h3 className="font-display text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">{lang === 'en' ? 'The Foundation' : 'መሠረቱ'}</h3>
                      <p className="text-navy-700/70 text-base leading-relaxed text-justify flex-1">{a.executive.p1[lang]}</p>
                    </div>
                  </div>
                  <div className="relative bg-white border border-navy-100 border-t-4 border-t-forest-700 p-6 hover-lift group flex flex-col">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-navy-800 -skew-x-[30deg] -translate-y-1/2 translate-x-4 flex items-center justify-center">
                      <span className="skew-x-[30deg] text-gold-400 font-bold text-lg">02</span>
                    </div>
                    <div className="mt-4 flex-1 flex flex-col">
                      <div className="w-10 h-1 bg-navy-800 mb-4" />
                      <h3 className="font-display text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">{lang === 'en' ? 'The Strategic Transition' : 'ስትራቴጂካዊ ሽግግሩ'}</h3>
                      <p className="text-navy-700/70 text-base leading-relaxed text-justify flex-1">{a.executive.p2[lang]}</p>
                    </div>
                  </div>
                  <div className="relative bg-white border border-navy-100 border-t-4 border-t-forest-700 p-6 hover-lift group flex flex-col">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-forest-600 -skew-x-[30deg] -translate-y-1/2 translate-x-4 flex items-center justify-center">
                      <span className="skew-x-[30deg] text-white font-bold text-lg">03</span>
                    </div>
                    <div className="mt-4 flex-1 flex flex-col">
                      <div className="w-10 h-1 bg-forest-600 mb-4" />
                      <h3 className="font-display text-xl font-bold text-navy-900 mb-3 group-hover:text-forest-600 transition-colors">{lang === 'en' ? 'The Engineering Mindset' : 'የምህንድስና አስተሳሰብ'}</h3>
                      <p className="text-navy-700/70 text-base leading-relaxed text-justify flex-1">{a.executive.p3[lang]}</p>
                    </div>
                  </div>
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
                <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{a.visionMission.visionLabel[lang]}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4 mb-4">{a.visionMission.visionTitle[lang]}</h2>
                <p className="text-white/60 leading-relaxed text-justify">{a.visionMission.visionDesc[lang]}</p>
              </div>
              <div className="bg-gradient-to-br from-forest-600/20 to-navy-900/60 border border-forest-500/20 p-8">
                <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{a.visionMission.missionLabel[lang]}</span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-4 mb-6">{a.visionMission.missionTitle[lang]}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {missionCards.map((card) => (
                    <div key={card.titleEn} className="relative bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-forest-500/30 transition-all group overflow-hidden">
                      <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-forest-500/10 group-hover:bg-forest-500/20 transition-colors" />
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center mb-3 shadow-lg shadow-forest-500/20">
                          <span className="text-lg">{card.icon}</span>
                        </div>
                        <h3 className="font-display font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{lang === 'en' ? card.titleEn : card.titleAm}</h3>
                        <p className="text-forest-400 text-sm font-mono font-bold tracking-wide">{lang === 'en' ? card.statEn : card.statAm}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 bg-[#f5f4ef]">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="font-mono text-sm sm:text-base font-bold tracking-[0.3em] text-forest-600 uppercase">{a.timeline.label[lang]}</span>
              <h2 className="font-display text-4xl font-bold text-navy-900 mt-3">{a.timeline.title[lang]}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {timeline.map((item, i) => {
                const isKeyEvent = i === 1 || i === 3;
                return (
                  <div
                    key={i}
                    className={`group relative bg-white border border-navy-100 p-6 hover-lift ${isKeyEvent ? 'md:col-span-2 lg:col-span-1 md:col-start-1 lg:col-start-auto ring-1 ring-navy-200' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-sm font-bold text-white bg-navy-900 px-3 py-1">{item.year}</span>
                      {isKeyEvent && <span className="text-[10px] font-mono uppercase tracking-wider text-gold-600">{lang === 'en' ? 'Key Milestone' : 'ቁልፍ ምዕራፍ'}</span>}
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">{lang === 'en' ? item.titleEn : item.titleAm}</h3>
                    <p className="text-navy-700/70 text-base leading-relaxed text-justify">{lang === 'en' ? item.descEn : item.descAm}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="esg" className="py-20 bg-white overflow-hidden">
          <div className="text-center mb-8 px-4 container-custom">
            <span className="font-mono text-sm sm:text-base font-bold tracking-[0.3em] text-forest-600 uppercase">{a.esg.label[lang]}</span>
            <h2 className="font-display text-4xl font-bold text-navy-900 mt-3">{a.esg.title[lang]}</h2>
          </div>
          <div className="relative bg-[#0a1a0e] text-white overflow-hidden w-full">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(30,120,60,0.4)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,168,75,0.1)_0%,transparent_40%)]" />
            <div className="absolute top-0 right-0 w-48 h-48 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-14 md:py-16 flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center shadow-lg shadow-forest-500/20">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-white/85 text-base md:text-lg leading-relaxed text-justify">{lang === 'en' ? greenLegacyText.en : greenLegacyText.am}</p>
                    <div className="mt-4 flex items-center gap-2 text-forest-400 text-base font-mono tracking-wider uppercase">
                  <span className="w-6 h-px bg-forest-500" />
                  {lang === 'en' ? 'Green Legacy Partner' : 'አረንጓዴ አሻራ አጋር'}
                </div>
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
              <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{a.leadership.label[lang]}</span>
              <h2 className="font-display text-4xl font-bold mt-3">{a.leadership.title[lang]}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-white/70 text-lg leading-relaxed text-justify text-center">{lang === 'en' ? governanceDesc.en : governanceDesc.am}</p>
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
