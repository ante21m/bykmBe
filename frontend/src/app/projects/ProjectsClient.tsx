'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Zap, Search, Filter, type LucideIcon } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetProjectsQuery } from '@/lib/redux/api';
import type { ProjectData } from '@/lib/redux/api';

const pillarLabelMap: Record<string, { en: string; am: string }> = {
  agro: { en: 'Agro-Industrialization', am: 'አግሮ-ኢንዱስትሪላይዜሽን' },
  infrastructure: { en: 'Infrastructure', am: 'መሠረተ ልማት' },
  logistics: { en: 'Global Trade & Logistics', am: 'ዓለም አቀፍ ንግድ እና ሎጂስቲክስ' },
  digital: { en: 'Digital Economy', am: 'ዲጂታል ኢኮኖሚ' },
  hospitality: { en: 'Hospitality & Retail', am: 'ሆስፒታሊቲ እና ችርቻሮ' },
};

const headerStats = [
  { val: '2', labelEn: 'Completed Flagships', labelAm: 'የተጠናቀቁ ባንዲራዎች' },
  { val: '2', labelEn: 'Active Initiatives', labelAm: 'ንቁ ተነሳሽነቶች' },
  { val: '2', labelEn: 'Pipeline Projects', labelAm: 'በሂደት ላይ ፕሮጀክቶች' },
  { val: '2024–2030', labelEn: 'Strategic Window', labelAm: 'ስትራቴጂካዊ መስኮት' },
];

const statusConfig: Record<string, { labelEn: string; labelAm: string; Icon: LucideIcon; color: string; bg: string; border: string }> = {
  completed: { labelEn: 'Completed', labelAm: 'ተጠናቋል', Icon: CheckCircle2, color: 'text-forest-500', bg: 'bg-green-50', border: 'border-green-200' },
  active:    { labelEn: 'Active',    labelAm: 'ንቁ',     Icon: Zap,          color: 'text-gold-600',   bg: 'bg-yellow-50', border: 'border-yellow-200' },
  pipeline:  { labelEn: 'Pipeline',  labelAm: 'በሂደት ላይ',  Icon: Clock,        color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
};

const pillarColors: Record<string, string> = {
  agro: '#2e7d32', infrastructure: '#1a237e', logistics: '#3949ab', digital: '#2e7d32', hospitality: '#c8a84b',
};

interface FlattenedProject {
  id: string;
  featured: boolean;
  titleEn: string;
  titleAm: string;
  pillar: string;
  status: string;
  clientEn: string;
  clientAm: string;
  locationEn: string;
  locationAm: string;
  startYear?: number;
  endYear?: number;
  descEn: string;
  descAm: string;
  scopeEn: string;
  scopeAm: string;
  achievEn: string;
  achievAm: string;
  kpis: { val: string; labelEn: string; labelAm: string }[];
}

function flattenProject(p: ProjectData): FlattenedProject {
  let kpis: { val: string; labelEn: string; labelAm: string }[] = [];
  if (p.kpis) {
    try { kpis = JSON.parse(p.kpis); } catch {}
  }
  return {
    id: p.id,
    featured: p.featured,
    titleEn: p.title,
    titleAm: p.titleAm || p.title,
    pillar: p.pillar,
    status: p.status,
    clientEn: p.client || '',
    clientAm: p.clientAm || p.client || '',
    locationEn: p.location || '',
    locationAm: p.locationAm || p.location || '',
    startYear: p.startYear,
    endYear: p.endYear,
    descEn: p.description,
    descAm: p.descAm || p.description,
    scopeEn: p.scope || '',
    scopeAm: p.scopeAm || p.scope || '',
    achievEn: p.achievement || '',
    achievAm: p.achievAm || p.achievement || '',
    kpis,
  };
}

export function ProjectsClient() {
  const { lang, translations: t } = useTranslation();
  const p = t.projects;

  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const apiPillar = filterPillar !== 'all' ? filterPillar : undefined;
  const apiStatus = filterStatus !== 'all' ? filterStatus : undefined;
  const { data: rawProjects, isLoading, error } = useGetProjectsQuery(
    apiPillar || apiStatus ? { pillar: apiPillar, status: apiStatus } : undefined,
  );

  const allProjects = (rawProjects || []).map(flattenProject);

  const filtered = allProjects.filter((proj) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const title = lang === 'en' ? proj.titleEn.toLowerCase() : proj.titleAm.toLowerCase();
      const desc = lang === 'en' ? proj.descEn.toLowerCase() : proj.descAm.toLowerCase();
      if (!title.includes(q) && !desc.includes(q)) return false;
    }
    return true;
  });

  const featured = filtered.filter(proj => proj.featured);
  const pipeline = filtered.filter(proj => !proj.featured);

  const statusLabel = (s: string) => {
    const cfg = statusConfig[s];
    return cfg ? (lang === 'en' ? cfg.labelEn : cfg.labelAm) : s;
  };

  const pillarLabel = (key: string) => {
    const m = pillarLabelMap[key];
    return m ? (lang === 'en' ? m.en : m.am) : key;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-navy-500 text-sm font-mono">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <p className="text-red-500 text-sm">Failed to load projects.</p>
      </div>
    );
  }

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
            <span className="font-mono text-xs tracking-[0.3em] text-gold-400 uppercase">{p.header.label[lang]}</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{p.header.title[lang]}</h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">{p.header.desc[lang]}</p>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {headerStats.map(s => (
                <div key={s.labelEn}>
                  <div className="font-display text-3xl font-bold text-gold-400">{s.val}</div>
                  <p className="text-white/40 text-sm font-mono tracking-wide mt-1">{lang === 'en' ? s.labelEn : s.labelAm}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-white border-b border-navy-100 py-6 sticky top-20 z-30">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-navy-400" />
                <span className="font-mono text-xs tracking-wider text-navy-500 uppercase">{p.filters.title[lang]}</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                  <input
                    type="text"
                    placeholder={p.filters.search[lang]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-2 text-sm border border-navy-200 outline-none focus:border-navy-600 w-48"
                  />
                </div>
                <select
                  value={filterPillar}
                  onChange={(e) => setFilterPillar(e.target.value)}
                  className="text-sm border border-navy-200 px-3 py-2 outline-none focus:border-navy-600 bg-white"
                >
                  <option value="all">{p.filters.allPillars[lang]}</option>
                  {Object.entries(pillarLabelMap).map(([key, val]) => <option key={key} value={key}>{lang === 'en' ? val.en : val.am}</option>)}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-sm border border-navy-200 px-3 py-2 outline-none focus:border-navy-600 bg-white"
                >
                  <option value="all">{p.filters.allStatuses[lang]}</option>
                  {Object.entries(statusConfig).map(([key, val]) => <option key={key} value={key}>{lang === 'en' ? val.labelEn : val.labelAm}</option>)}
                </select>
                <span className="text-sm text-navy-400 font-mono">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <section className="section-padding bg-[#f5f4ef]">
          <div className="container-custom text-center py-20">
            <p className="text-navy-500 text-lg">{p.filters.empty[lang]}</p>
            <button onClick={() => { setFilterPillar('all'); setFilterStatus('all'); setSearchQuery(''); }}
              className="btn-primary mt-6"><span>{p.filters.reset[lang]}</span></button>
          </div>
        </section>
      ) : (
        <>
          {featured.length > 0 && (
            <ScrollReveal>
              <section className="section-padding bg-[#f5f4ef]">
                <div className="container-custom">
                  <div className="mb-12">
                    <span className="font-mono text-xs tracking-[0.3em] text-gold-600 uppercase">{p.flagships.label[lang]}</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-2">{p.flagships.title[lang]}</h2>
                  </div>
                  <div className="space-y-8">
                    {featured.map((project, i) => {
                      const cfg = statusConfig[project.status];
                      const SIcon = cfg.Icon;
                      const color = pillarColors[project.pillar];
                      return (
                        <div key={project.id} className="bg-white border border-navy-100 overflow-hidden hover-lift">
                          <div className="grid lg:grid-cols-3">
                            <div className="lg:col-span-1 p-10 flex flex-col justify-between min-h-[280px]" style={{ backgroundColor: color }}>
                              <div>
                                <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">{pillarLabel(project.pillar)}</span>
                                <div className="text-7xl font-display font-bold text-white/10 mt-2">{String(i + 1).padStart(2, '0')}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mt-6">
                                {project.kpis.map((k, ki) => (
                                  <div key={ki}>
                                    <div className="text-white font-display font-bold text-lg leading-tight">{k.val}</div>
                                    <div className="text-white/50 text-xs uppercase tracking-wide font-mono mt-0.5">{lang === 'en' ? k.labelEn : k.labelAm}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="lg:col-span-2 p-8 md:p-10">
                              <div className="flex items-center gap-3 mb-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                  <SIcon size={12} />{statusLabel(project.status)}
                                </span>
                                <span className="text-navy-700/40 text-sm">{project.startYear}{project.endYear ? `–${project.endYear}` : '–Present'}</span>
                              </div>
                              <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-3">{lang === 'en' ? project.titleEn : project.titleAm}</h3>
                              <p className="text-navy-700/60 leading-relaxed mb-6">{lang === 'en' ? project.descEn : project.descAm}</p>
                              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                {[{ labelEn: 'Scope', labelAm: 'ወሰን', textEn: project.scopeEn, textAm: project.scopeAm }, { labelEn: 'Achievement', labelAm: 'ውጤት', textEn: project.achievEn, textAm: project.achievAm }].map(item => (
                                  <div key={item.labelEn}>
                                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-600">{lang === 'en' ? item.labelEn : item.labelAm}</span>
                                    <p className="text-navy-700/70 text-base mt-1 leading-relaxed">{lang === 'en' ? item.textEn : item.textAm}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-navy-100 pt-4">
                                <span className="text-sm text-navy-700/40 font-mono">Client: </span>
                                <span className="text-sm text-navy-700/70 font-bold">{lang === 'en' ? project.clientEn : project.clientAm}</span>
                                <span className="mx-2 text-navy-700/20">·</span>
                                <span className="text-sm text-navy-700/40">{lang === 'en' ? project.locationEn : project.locationAm}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}

          {pipeline.length > 0 && (
            <ScrollReveal>
              <section className="section-padding bg-white">
                <div className="container-custom">
                  <div className="mb-12">
                    <span className="font-mono text-xs tracking-[0.3em] text-gold-600 uppercase">{p.pipeline.label[lang]}</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mt-2">{p.pipeline.title[lang]}</h2>
                    <p className="text-navy-700/60 mt-3 max-w-2xl">{p.pipeline.desc[lang]}</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pipeline.map(project => {
                      const cfg = statusConfig[project.status];
                      const SIcon = cfg.Icon;
                      const color = pillarColors[project.pillar];
                      return (
                        <div key={project.id} className="border border-navy-100 p-6 hover-lift group bg-[#f5f4ef]">
                          <div className="flex items-center justify-between mb-5">
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white px-2 py-1" style={{ backgroundColor: color }}>
                              {pillarLabel(project.pillar)}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 ${cfg.bg} ${cfg.color}`}>
                              <SIcon size={10} />{statusLabel(project.status)}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-navy-900 mb-3 group-hover:text-navy-600 transition-colors">{lang === 'en' ? project.titleEn : project.titleAm}</h3>
                          <p className="text-navy-700/60 text-base leading-relaxed mb-4">{lang === 'en' ? project.descEn : project.descAm}</p>
                          <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-navy-100 mb-4">
                            {project.kpis.map((k, ki) => (
                              <div key={ki} className="text-center">
                                <div className="font-display font-bold text-navy-900 text-sm">{k.val}</div>
                                <div className="text-navy-700/40 text-xs font-mono uppercase tracking-wide mt-0.5">{lang === 'en' ? k.labelEn : k.labelAm}</div>
                              </div>
                            ))}
                          </div>
                          <div className="text-sm text-navy-700/40 font-mono">{lang === 'en' ? project.clientEn : project.clientAm} · {lang === 'en' ? project.locationEn : project.locationAm}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </ScrollReveal>
          )}
        </>
      )}

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
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{p.cta.title[lang]}</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">{p.cta.desc[lang]}</p>
            <Link href="/contact" className="btn-primary"><span>{p.cta.cta[lang]}</span><ArrowRight size={16} /></Link>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
