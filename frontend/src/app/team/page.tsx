'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Building2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetActiveTeamMembersQuery } from '@/lib/redux/api';
import type { TeamMemberData } from '@/lib/redux/api';

function LeadershipGrid({ leaders, lang }: { leaders: TeamMemberData[]; lang: string }) {
  const { translations: tm } = useTranslation();
  const tlm = tm.team.leadership;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leaders.map((leader) => (
        <div key={leader.id} className="bg-white border border-navy-100 overflow-hidden group hover:shadow-lg hover:border-gold-200 transition-all duration-300">
          <div className="aspect-[4/3] bg-gradient-to-br from-navy-50 to-navy-100 relative overflow-hidden">
            <img
              src={leader.imageUrl || '/images/placeholder.jpg'}
              alt={lang === 'en' ? leader.nameEn : leader.nameAm}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-base font-bold text-navy-900">{lang === 'en' ? leader.nameEn : leader.nameAm}</h3>
            <p className="text-gold-600 text-xs font-mono mt-1 mb-3">{lang === 'en' ? leader.titleEn : leader.titleAm}</p>
            <Link href={`/team/${leader.id}`} className="inline-block text-xs font-mono tracking-wider uppercase text-navy-900 border border-navy-900 px-4 py-1.5 hover:bg-navy-900 hover:text-gold-400 transition-all duration-200">{tlm.cta[lang as 'en' | 'am']}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamPage() {
  const { lang, translations: t } = useTranslation();
  const tm = t.team;
  const { data: allMembers = [], isLoading } = useGetActiveTeamMembersQuery();
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const founder = allMembers.find((m) => m.category === 'founder');
  const leaders = allMembers.filter((m) => m.category === 'leadership');

  const pillars = [
    {
      key: 'sovereign',
      icon: Building2,
      title: tm.pillars.sovereign[lang],
      desc: tm.sovereign.desc[lang],
      subItems: [
        { title: tm.sovereign.generalAssembly[lang], desc: tm.sovereign.generalAssemblyDesc[lang] },
      ],
    },
    {
      key: 'executive',
      icon: Building2,
      title: tm.pillars.executive[lang],
      desc: tm.executive.desc[lang],
      subItems: [
        { title: tm.executive.gm[lang], desc: tm.executive.gmDesc[lang] },
        { title: tm.executive.dgm[lang], desc: tm.executive.dgmDesc[lang] },
      ],
    },
    {
      key: 'shared',
      icon: Building2,
      title: tm.pillars.shared[lang],
      desc: tm.shared.desc[lang],
      subItems: [
        { title: tm.shared.finance[lang], desc: tm.shared.financeDesc[lang] },
        { title: tm.shared.corporate[lang], desc: tm.shared.corporateDesc[lang] },
        { title: tm.shared.asset[lang], desc: tm.shared.assetDesc[lang] },
      ],
    },
    {
      key: 'operational',
      icon: Building2,
      title: tm.pillars.operational[lang],
      desc: tm.operational.desc[lang],
      subItems: [
        { title: tm.operational.agro[lang], desc: tm.operational.agroFocus[lang] },
        { title: tm.operational.infrastructure[lang], desc: tm.operational.infrastructureFocus[lang] },
        { title: tm.operational.gateway[lang], desc: tm.operational.gatewayFocus[lang] },
        { title: tm.operational.digital[lang], desc: tm.operational.digitalFocus[lang] },
        { title: tm.operational.hospitality[lang], desc: tm.operational.hospitalityFocus[lang] },
      ],
    },
  ];

  return (
    <>
      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#080616] text-white pt-32 pb-20 md:pb-28">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.6)_0%,rgba(8,6,22,0.2)_50%,transparent_80%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(200,168,75,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          </div>
          <div className="geo-shape w-96 h-96 top-[-80px] right-[-80px] rotate-12 opacity-10" />
          <div className="geo-shape w-56 h-56 bottom-10 right-1/3 rotate-45 opacity-[0.06]" />
          <div className="container-custom relative z-10">
            <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{tm.header.label[lang]}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 max-w-4xl">
              <span className="bg-gradient-to-r from-white via-white to-gold-300/80 bg-clip-text text-transparent">{tm.header.title[lang]}</span>
            </h1>
            <p className="text-white/60 max-w-3xl text-lg leading-relaxed">{tm.header.desc[lang]}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-navy-900 to-navy-700 overflow-hidden">
                  <img src="/images/owner.jpg" alt="Besufekad Molla Wube" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold-400/10 rounded-full blur-2xl" />
              </div>
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{lang === 'en' ? 'Founder & Chairman' : 'አስተዳዳሪ እና ፕሬዚዳንት'}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-2">{founder ? (lang === 'en' ? founder.nameEn : founder.nameAm) : tm.founder.name[lang]}</h2>
                <p className="text-navy-700/60 text-sm font-mono mb-6">{founder ? (lang === 'en' ? founder.titleEn : founder.titleAm) : tm.founder.title[lang]}</p>
                <div className="w-16 h-1 bg-gold-400 mb-6" />
                <p className="text-navy-700/80 text-lg leading-relaxed whitespace-pre-line text-justify">{founder ? (lang === 'en' ? founder.descEn : founder.descAm) : tm.founder.statement[lang]}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-[#f5f4ef]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">{t.team.leadership.label[lang as 'en' | 'am']}</h2>
              <div className="w-12 h-1 bg-gold-400 mx-auto mt-4" />
            </div>

            <LeadershipGrid leaders={leaders} lang={lang} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-[#f5f4ef]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{tm.header.label[lang]}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-3">{lang === 'en' ? 'Organizational Structure' : 'የድርጅት ስርዓት'}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isOpen = expandedPillar === pillar.key;
                return (
                  <div key={pillar.key} className="bg-white border border-navy-100 overflow-hidden hover-lift">
                    <button
                      onClick={() => setExpandedPillar(isOpen ? null : pillar.key)}
                      className="w-full flex items-center gap-4 p-6 text-left group"
                    >
                      <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-gold-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{pillar.title}</h3>
                        <p className="text-navy-700/60 text-sm mt-1 line-clamp-2">{pillar.desc}</p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-navy-700/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="px-6 pb-6 space-y-4">
                        {pillar.subItems.map((item, i) => (
                            <div key={i} className="bg-[#f8f7f4] border border-navy-100/50 p-5">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-navy-900 text-base">{item.title}</h4>
                              </div>
                              <p className="text-navy-700/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
