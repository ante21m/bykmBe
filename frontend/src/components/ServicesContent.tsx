'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Leaf, Shield, Globe, Zap, TrendingUp } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';

const pillarIcons: Record<string, typeof Leaf> = {
  agro: Leaf, infrastructure: Shield, logistics: Globe, digital: Zap, hospitality: TrendingUp,
};

const pillarsData = [
  {
    key: 'infrastructure', number: 'I',
    titleEn: 'Infrastructure, Engineering & Urban Development',
    titleAm: 'መሠረተ ልማት፣ ምህንድስና እና የከተማ ልማት',
    taglineEn: 'Building the Modern Nation',
    taglineAm: 'ዘመናዊቷን ሀገር መገንባት',
    intentEn: 'To provide the physical foundation for a modern smart-city economy through integrated engineering.',
    intentAm: 'በተቀናጀ ምህንድስና ለዘመናዊ ስማርት-ከተማ ኢኮኖሚ አካላዊ መሠረት ለማቅረብ።',
    services: [
      { titleEn: 'Grade-4 General Contracting', titleAm: 'የደረጃ-4 አጠቃላይ ኮንትራክተር', descEn: 'Complex works in Building, Road, Water, and Electro-mechanical engineering (GC-4 certified).', descAm: 'በህንፃ፣ መንገድ፣ ውሃ እና ኤሌክትሮ-መካኒካል ምህንድስና ውስብስብ ስራዎች (GC-4 የተረጋገጠ)።', featuresEn: ['Building construction', 'Road & highway', 'Water infrastructure', 'Electro-mechanical'], featuresAm: ['የህንፃ ግንባታ', 'መንገድ እና ሀይዌይ', 'የውሃ መሠረተ ልማት', 'ኤሌክትሮ-መካኒካል'] },
      { titleEn: 'Urban Redevelopment & Living Infrastructure', titleAm: 'የከተማ መልሶ ልማት እና የቀጥታ መሠረተ ልማት', descEn: 'Mega-Corridor projects blending heavy civil engineering with ecological restoration.', descAm: 'የሜጋ-ኮሪደር ፕሮጀክቶች ከባድ ሲቪል ምህንድስናን ከሥነ-ምህዳር መልሶ ማቋቋም ጋር የሚያዋህዱ።', featuresEn: ['Mega-corridor dev', 'Urban green lungs', 'Riverside stabilization', 'Sustainable drainage'], featuresAm: ['ሜጋ-ኮሪደር ልማት', 'የከተማ አረንጓዴ ሳንባዎች', 'የወንዝ ዳር ማረጋጋት', 'ዘላቂ የፍሳሽ ማስወገጃ'] },
      { titleEn: 'Real Estate & Technical Consultancy', titleAm: 'ሪል እስቴት እና ቴክኒክ አማካሪነት', descEn: 'Urban land acquisition and development plus engineering management consultancy.', descAm: 'የከተማ መሬት ግዥ እና ልማት እንዲሁም የምህንድስና አስተዳደር አማካሪነት።', featuresEn: ['Real estate dev', 'Commercial complexes', 'Engineering consultancy', 'Project management'], featuresAm: ['ሪል እስቴት ልማት', 'የንግድ ኮምፕሌክሶች', 'የምህንድስና አማካሪነት', 'የፕሮጀክት አስተዳደር'] },
    ],
  },
  {
    key: 'logistics', number: 'II',
    titleEn: 'Global Trade, Logistics & Transport',
    titleAm: 'ዓለም አቀፍ ንግድ፣ ሎጂስቲክስ እና ትራንስፖርት',
    taglineEn: 'Ethiopia\'s Gateway to the World',
    taglineAm: 'የኢትዮጵያ ወደ ዓለም መግቢያ በር',
    intentEn: 'To position BYKM as the primary link between Ethiopian producers and international markets.',
    intentAm: 'BYKM ን በኢትዮጵያ አምራቾች እና ዓለም አቀፍ ገበያዎች መካከል ዋና አገናኝ ለማድረግ።',
    services: [
      { titleEn: 'Strategic Import/Export & Trade Agency', titleAm: 'ስትራቴጂካዊ ማስመጣት/መላክ እና የንግድ ወኪልነት', descEn: 'Facilitating industrial machinery, stationery, and general commodities flow with commission agent services.', descAm: 'የኢንዱስትሪ ማሽነሪዎችን፣ የቢሮ እቃዎች እና አጠቃላይ ምርቶችን ፍሰት ከኮሚሽን ወኪል አገልግሎቶች ጋር ማመቻቸት።', featuresEn: ['Industrial import', 'Agricultural export', 'Trade agency', 'Commission services'], featuresAm: ['የኢንዱስትሪ ማስመጣት', 'የግብርና ምርት መላክ', 'የንግድ ወኪልነት', 'የኮሚሽን አገልግሎቶች'] },
      { titleEn: 'Logistics, Warehousing & Fleet Management', titleAm: 'ሎጂስቲክስ፣ መጋዘን እና የመርከብ አስተዳደር', descEn: 'Transit services, freight forwarding, high-capacity warehousing, and heavy machinery rental.', descAm: 'የመጓጓዣ አገልግሎቶች፣ የጭነት ዝውውር፣ ከፍተኛ አቅም ያለው መጋዘን እና የከባድ ማሽነሪ ኪራይ።', featuresEn: ['Freight forwarding', 'High-capacity warehousing', 'Vehicle rental', 'Fleet management'], featuresAm: ['የጭነት ዝውውር', 'ከፍተኛ አቅም ያለው መጋዘን', 'የተሽከርካሪ ኪራይ', 'የመርከብ አስተዳደር'] },
    ],
  },
  {
    key: 'agro', number: 'III',
    titleEn: 'Agro-Industrialization & Natural Resources',
    titleAm: 'አግሮ-ኢንዱስትሪላይዜሽን እና የተፈጥሮ ሀብቶች',
    taglineEn: 'From Soil to Global Shelf',
    taglineAm: 'ከአፈር እስከ ዓለም አቀፍ መደርደሪያ',
    intentEn: 'To transition Ethiopia from a raw-material exporter to a processed-goods powerhouse.',
    intentAm: 'ኢትዮጵያን ከጥሬ ዕቃ ላኪ ወደ ተመረተ ምርት ኃያል ሀገር ለማሸጋገር።',
    services: [
      { titleEn: 'Coffee Value Chain Management', titleAm: 'የቡና እሴት ሰንሰለት አስተዳደር', descEn: 'Full lifecycle management of Ethiopia\'s "green gold" — from industrial roasting to strategic export of finished products.', descAm: 'የኢትዮጵያን "አረንጓዴ ወርቅ" ሙሉ የህይወት ዑደት አስተዳደር — ከኢንዱስትሪ ማብሰያ እስከ ስትራቴጂካዊ ወደ ውጭ መላክ ድረስ።', featuresEn: ['Industrial coffee roasting', 'Premium packaging', 'International export', 'FX optimization'], featuresAm: ['የኢንዱስትሪ ቡና ማብሰያ', 'ፕሪሚየም ማሸጊያ', 'አለም አቀፍ ኤክስፖርት', 'የውጭ ምንዛሪ ማመቻቸት'] },
      { titleEn: 'High-Value Agriculture & Agro-Processing', titleAm: 'ከፍተኛ ዋጋ ያለው ግብርና እና አግሮ-ፕሮሰሲንግ', descEn: 'Commercial production and export of oilseeds, pulses, and industrial crops with import substitution manufacturing.', descAm: 'የቅባት እህሎች፣ ጥራጥሬዎች እና የኢንዱስትሪ ሰብሎች የንግድ ምርት እና ወደ ውጭ መላክ ከማስመጣት መተካት ማምረት ጋር።', featuresEn: ['Oilseed & pulse production', 'Industrial crop cultivation', 'Agro-processing', 'Import substitution'], featuresAm: ['የቅባት እህል እና ጥራጥሬ ምርት', 'የኢንዱስትሪ ሰብል ማልማት', 'አግሮ-ፕሮሰሲንግ', 'ማስመጣትን መተካት'] },
      { titleEn: 'Mineral Extraction & Bottled Water', titleAm: 'ማዕድን ማውጣት እና የታሸገ ውሃ', descEn: 'Sustainable mining and mineral water production aligned with Ethiopia\'s National Green Legacy.', descAm: 'ከኢትዮጵያ ብሄራዊ አረንጓዴ አሻራ ጋር የተጣጣመ ዘላቂ የማዕድን እና የማዕድን ውሃ ምርት።', featuresEn: ['Sustainable extraction', 'Mineral water production', 'Green protocols', 'Biodiversity preservation'], featuresAm: ['ዘላቂ ማውጣት', 'የማዕድን ውሃ ምርት', 'አረንጓዴ ፕሮቶኮሎች', 'የብዝሃ ህይወት ጥበቃ'] },
    ],
  },
  {
    key: 'digital', number: 'IV',
    titleEn: 'Digital Economy, Media & Technical Services',
    titleAm: 'ዲጂታል ኢኮኖሚ፣ ሚዲያ እና ቴክኒክ አገልግሎቶች',
    taglineEn: 'Industry 4.0 for Ethiopia',
    taglineAm: 'ኢንዱስትሪ 4.0 ለኢትዮጵያ',
    intentEn: 'To integrate technology into the industrial process, moving Ethiopia toward Industry 4.0.',
    intentAm: 'በኢንዱስትሪ ሂደት ውስጥ ቴክኖሎጂን ለማዋሃድ፣ ኢትዮጵያን ወደ ኢንዱስትሪ 4.0 ለማሸጋገር።',
    services: [
      { titleEn: 'ICT & Telecommunications Infrastructure', titleAm: 'አይሲቲ እና ቴሌኮሙኒኬሽን መሠረተ ልማት', descEn: 'Network infrastructure, ICT system integration, and smart city connectivity solutions.', descAm: 'የአውታረ መረብ መሠረተ ልማት፣ የአይሲቲ ሥርዓት ውህደት እና የስማርት ከተማ ግንኙነት መፍትሄዎች።', featuresEn: ['Network infra', 'ICT integration', 'Telecom solutions', 'Smart cities'], featuresAm: ['የኔትወርክ መሠረተ ልማት', 'የአይሲቲ ውህደት', 'የቴሌኮም መፍትሄዎች', 'ስማርት ከተሞች'] },
      { titleEn: 'Printing, Publishing & Knowledge Transfer', titleAm: 'ህትመት፣ ኅትመት ሥራ እና የእውቀት ሽግግር', descEn: 'Full-scale printing, specialized machinery import, and vocational ICT training for Ethiopia\'s workforce.', descAm: 'ሙሉ ልኬት ህትመት፣ ልዩ ማሽነሪዎች ማስመጣት እና ለኢትዮጵያ የሰው ኃይል የሙያ አይሲቲ ስልጠና።', featuresEn: ['Commercial printing', 'Machinery import', 'ICT training', 'Digital literacy'], featuresAm: ['የንግድ ህትመት', 'ማሽነሪ ማስመጣት', 'የአይሲቲ ስልጠና', 'ዲጂታል ማንበብና መጻፍ'] },
    ],
  },
  {
    key: 'hospitality', number: 'V',
    titleEn: 'Hospitality, Retail & Consumer Ecosystems',
    titleAm: 'ሆስፒታሊቲ፣ ችርቻሮ እና የሸማች ሥነ-ምህዳር',
    taglineEn: 'Elevating Ethiopian Living',
    taglineAm: 'የኢትዮጵያን የኑሮ ደረጃ ማሳደግ',
    intentEn: 'To elevate the standard of living and consumption in Modern Ethiopia.',
    intentAm: 'በዘመናዊቷ ኢትዮጵያ የኑሮ እና የፍጆታ ደረጃን ከፍ ለማድረግ።',
    services: [
      { titleEn: 'Luxury Hospitality & Eco-Resorts', titleAm: 'የቅንጦት ሆስፒታሊቲ እና ኢኮ-ሪዞርቶች', descEn: 'Development and management of hotels, eco-resorts, and leisure services showcasing Ethiopian hospitality.', descAm: 'የኢትዮጵያን እንግድነት የሚያሳዩ ሆቴሎች፣ ኢኮ-ሪዞርቶች እና የመዝናኛ አገልግሎቶች ልማት እና አስተዳደር።', featuresEn: ['Hotel dev & mgmt', 'Eco-resorts', 'Leisure services', 'Ethiopian brand'], featuresAm: ['ሆቴል ልማት እና አስተዳደር', 'ኢኮ-ሪዞርቶች', 'የመዝናኛ አገልግሎቶች', 'የኢትዮጵያ ብራንድ'] },
      { titleEn: 'Modernized Retail & Agricultural Supply', titleAm: 'ዘመናዊ ችርቻሮ እና የግብርና አቅርቦት', descEn: 'Multi-format retail network plus high-quality fertilizer, veterinary, and agricultural chemical distribution.', descAm: 'ባለ ብዙ ቅርጸት የችርቻሮ አውታር እንዲሁም ከፍተኛ ጥራት ያለው የማዳበሪያ፣ የእንስሳት ህክምና እና የግብርና ኬሚካል ስርጭት።', featuresEn: ['Retail network', 'Agri-input supply', 'Fertilizer dist.', 'Consumer goods'], featuresAm: ['የችርቻሮ አውታር', 'የግብርና ግብዓት አቅርቦት', 'የማዳበሪያ ስርጭት', 'የፍጆታ ዕቃዎች'] },
    ],
  },
];

export function ServicesContent() {
  const { lang, translations: t } = useTranslation();
  const s = t.services;

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
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{s.header.label[lang]}</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-4xl">{s.header.title[lang]}</h1>
            <p className="text-white/60 max-w-3xl text-lg leading-relaxed">{s.header.desc[lang]}</p>
          </div>
        </section>
      </ScrollReveal>

      {pillarsData.map((pillar, pIdx) => {
        const Icon = pillarIcons[pillar.key] || Leaf;
        return (
          <ScrollReveal key={pillar.key}>
            <section className={`section-padding ${pIdx % 2 === 0 ? 'bg-white' : 'bg-[#f5f4ef]'}`}>
              <div className="container-custom">
                <div className="grid lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
                    <div className="w-14 h-14 flex items-center justify-center mb-4" style={{ backgroundColor: `${pillarIcons[pillar.key] === Leaf ? '#2e7d32' : pillar.key === 'infrastructure' ? '#1a237e' : pillar.key === 'logistics' ? '#3949ab' : pillar.key === 'digital' ? '#2e7d32' : '#c8a84b'}15` }}>
                      <Icon size={24} style={{ color: pillarIcons[pillar.key] === Leaf ? '#2e7d32' : pillar.key === 'infrastructure' ? '#1a237e' : pillar.key === 'logistics' ? '#3949ab' : pillar.key === 'digital' ? '#2e7d32' : '#c8a84b' }} />
                    </div>
                    <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">Pillar {pillar.number}</span>
                    <h2 className="font-display text-3xl font-bold text-navy-900 mt-2 mb-3">{lang === 'en' ? pillar.titleEn : pillar.titleAm}</h2>
                    <p className="text-base font-bold text-navy-700/60 mb-2 italic">{lang === 'en' ? pillar.taglineEn : pillar.taglineAm}</p>
                    <p className="text-navy-700/60 text-base leading-relaxed">{lang === 'en' ? pillar.intentEn : pillar.intentAm}</p>
                  </div>
                  <div className="lg:col-span-3 space-y-6">
                    {pillar.services.map((svc, sIdx) => (
                      <div key={sIdx} className="bg-white border border-navy-100 p-6 md:p-8 hover-lift">
                        <h3 className="font-display text-xl font-bold text-navy-900 mb-3">{lang === 'en' ? svc.titleEn : svc.titleAm}</h3>
                        <p className="text-navy-700/60 text-base leading-relaxed mb-4">{lang === 'en' ? svc.descEn : svc.descAm}</p>
                        <ul className="grid grid-cols-2 gap-3">
                          {(lang === 'en' ? svc.featuresEn : svc.featuresAm).map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm font-medium text-navy-700/80">
                              <CheckCircle2 size={16} className="text-forest-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#080616] text-white py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_50%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(40,70,180,0.2)_0%,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="geo-shape w-48 h-48 top-[-40px] right-[-20px] rotate-12 opacity-20" />
          <div className="geo-shape w-32 h-32 bottom-[-10px] left-1/4 rotate-45 opacity-10" />
          <div className="container-custom relative z-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{s.cta.title[lang]}</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">{s.cta.desc[lang]}</p>
            <Link href="/contact" className="btn-primary"><span>{s.cta.cta[lang]}</span><ArrowRight size={16} /></Link>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
