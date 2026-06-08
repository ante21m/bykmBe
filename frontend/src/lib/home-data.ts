export interface RawHomeSection {
  id: string;
  sectionKey: string;
  title: string;
  titleAm?: string;
  content: string;
  contentAm?: string;
  sortOrder: number;
  active: boolean;
}

function parseJson<T>(val: string | undefined | null, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}

export interface BilingualField {
  en: string;
  am: string;
}

interface StatItem {
  value: string;
  unit: BilingualField;
  label: BilingualField;
}

interface MissionItem {
  label: BilingualField;
  sub: BilingualField;
}

interface PillarMeta {
  tagline: BilingualField;
  exploreLabel: BilingualField;
}

interface KpiItem {
  val: string;
  label: BilingualField;
}

export interface HomeApiData {
  hero: {
    edition: BilingualField;
    motto: BilingualField;
    line1: BilingualField;
    line2: BilingualField;
    typeWords: BilingualField;
    desc: BilingualField;
    discoverBtn: BilingualField;
    viewProjectsBtn: BilingualField;
  };
  heroStats: StatItem[];
  mission: { label: BilingualField; title: BilingualField; items: MissionItem[] };
  pillars: { label: BilingualField; title: BilingualField; desc: BilingualField; explore: BilingualField };
  pillarsData: PillarMeta[];
  flagship: { label: BilingualField; title: BilingualField; desc: BilingualField; viewAll: BilingualField; kpis: KpiItem[]; client: BilingualField; clientSub: BilingualField };
  values: { label: BilingualField; title: BilingualField };
  esg: { label: BilingualField; title: BilingualField; desc: BilingualField; cta: BilingualField };
  partners: { label: BilingualField; title: BilingualField };
  cta: { label: BilingualField; title: BilingualField; desc: BilingualField; partnershipBtn: BilingualField; inquiryBtn: BilingualField };
}

function bf(en: string, am: string): BilingualField {
  return { en, am };
}

function flatToBf(flatEn: Record<string, string> | undefined, flatAm: Record<string, string> | undefined, key: string, fallbackEn = '', fallbackAm = ''): BilingualField {
  return {
    en: flatEn?.[key] ?? fallbackEn,
    am: flatAm?.[key] ?? fallbackAm,
  };
}

export function transformHomeSections(sections: RawHomeSection[]): HomeApiData | null {
  const get = (key: string) => sections.find(s => s.sectionKey === key);
  const hero = get('hero');
  const heroStats = get('heroStats');
  const mission = get('mission');
  const pillars = get('pillars');
  const flagship = get('flagship');
  const valSec = get('values');
  const esg = get('esg');
  const partners = get('partners');
  const cta = get('cta');

  if (!hero) return null;

  const heroEn = parseJson<Record<string, string>>(hero.content, {});
  const heroAm = parseJson<Record<string, string>>(hero.contentAm, {});

  const heroStatsArr = parseJson<Array<Record<string, string>>>(heroStats?.content, []);
  const heroStatsAmArr = parseJson<Array<Record<string, string>>>(heroStats?.contentAm, []);

  // Build hero stats with bilingual fields
  const stats: StatItem[] = heroStatsArr.map((s, i) => ({
    value: s.value || '',
    unit: bf(s.unit || '', heroStatsAmArr[i]?.unit || s.unit || ''),
    label: bf(s.labelEn || '', s.labelAm || heroStatsAmArr[i]?.labelAm || ''),
  }));

  const missEn = parseJson<Record<string, any>>(mission?.content, {});
  const missAm = parseJson<Record<string, any>>(mission?.contentAm, {});
  const missItemsEn: any[] = missEn?.items || [];
  const missItemsAm: any[] = missAm?.items || [];
  const missionItems: MissionItem[] = missItemsEn.map((item: any, i: number) => ({
    label: bf(item.label || '', missItemsAm[i]?.label || item.label || ''),
    sub: bf(item.sub || '', missItemsAm[i]?.sub || item.sub || ''),
  }));

  const pillEn = parseJson<Record<string, any>>(pillars?.content, {});
  const pillAm = parseJson<Record<string, any>>(pillars?.contentAm, {});
  const pillDataEn: any[] = pillEn?.pillarsData || [];
  const pillDataAm: any[] = pillAm?.pillarsData || [];
  const pillarsMeta: PillarMeta[] = pillDataEn.map((p: any, i: number) => ({
    tagline: bf(p.tagline || '', pillDataAm[i]?.tagline || p.tagline || ''),
    exploreLabel: bf(p.exploreLabel || '', pillDataAm[i]?.exploreLabel || p.exploreLabel || ''),
  }));

  const flagEn = parseJson<Record<string, any>>(flagship?.content, {});
  const flagAm = parseJson<Record<string, any>>(flagship?.contentAm, {});
  const flagKpisEn: any[] = flagEn?.kpis || [];
  const flagKpisAm: any[] = flagAm?.kpis || [];
  const kpis: KpiItem[] = flagKpisEn.map((k: any, i: number) => ({
    val: k.value || '',
    label: bf(k.label || '', flagKpisAm[i]?.label || k.label || ''),
  }));

  const esgEn = parseJson<Record<string, string>>(esg?.content, {});
  const esgAm = parseJson<Record<string, string>>(esg?.contentAm, {});

  const ctaEn = parseJson<Record<string, string>>(cta?.content, {});
  const ctaAm = parseJson<Record<string, string>>(cta?.contentAm, {});

  return {
    hero: {
      edition: flatToBf(heroEn, heroAm, 'edition', 'Edition 1.0', 'እትም 1.0'),
      motto: flatToBf(heroEn, heroAm, 'motto', 'Architecting Ethiopian Integrated Future!', 'የኢትዮጵያን የተቀናጀ የወደፊት እድገት በመቅረጽ!'),
      line1: flatToBf(heroEn, heroAm, 'line1', 'Building', 'እየገነባን'),
      line2: flatToBf(heroEn, heroAm, 'line2', 'Tomorrow', 'ነገን'),
      typeWords: bf(
        heroEn?.typeWords || 'Future',
        heroAm?.typeWords || 'የወደፊት',
      ),
      desc: flatToBf(heroEn, heroAm, 'desc'),
      discoverBtn: flatToBf(heroEn, heroAm, 'discoverBtn', 'Discover More', 'ተጨማሪ ይወቁ'),
      viewProjectsBtn: flatToBf(heroEn, heroAm, 'viewProjectsBtn', 'View Projects', 'ፕሮጀክቶችን ይመልከቱ'),
    },
    heroStats: stats,
    mission: {
      label: bf(missEn?.label || 'Our Mission', missAm?.label || 'ተልዕኳችን'),
      title: bf(missEn?.title || '', missAm?.title || ''),
      items: missionItems,
    },
    pillars: {
      label: bf(pillEn?.label || 'Our Strategic Pillars', pillAm?.label || 'ስትራቴጂካዊ ምሰሶዎቻችን'),
      title: bf(pillEn?.title || 'Five Pillars of Impact', pillAm?.title || 'አምስት የተፅእኖ ምሰሶዎች'),
      desc: bf(pillEn?.desc || '', pillAm?.desc || ''),
      explore: bf(pillEn?.explore || 'Explore', pillAm?.explore || 'ያስሱ'),
    },
    pillarsData: pillarsMeta,
    flagship: {
      label: bf(flagEn?.label || 'Flagship Project', flagAm?.label || 'ዋና ፕሮጀክት'),
      title: bf(flagEn?.title || '', flagAm?.title || ''),
      desc: bf(flagEn?.desc || '', flagAm?.desc || ''),
      viewAll: bf(flagEn?.viewAll || 'View All', flagAm?.viewAll || 'ሁሉንም ይመልከቱ'),
      kpis,
      client: bf(flagEn?.client || '', flagAm?.client || ''),
      clientSub: bf(flagEn?.clientSub || '', flagAm?.clientSub || ''),
    },
    values: {
      label: bf(valSec?.title || 'Our Core Values', valSec?.titleAm || 'ዋና እሴቶቻችን'),
      title: bf(
        parseJson<Record<string, string>>(valSec?.content, {})?.title || 'Values',
        parseJson<Record<string, string>>(valSec?.contentAm, {})?.title || 'እሴቶች',
      ),
    },
    esg: {
      label: bf(esgEn?.label || 'ESG', esgAm?.label || 'ኢኤስጂ'),
      title: bf(esgEn?.title || '', esgAm?.title || ''),
      desc: bf(esgEn?.desc || '', esgAm?.desc || ''),
      cta: bf(esgEn?.cta || 'Learn More', esgAm?.cta || 'ተጨማሪ ይወቁ'),
    },
    partners: {
      label: bf(parseJson<Record<string, string>>(partners?.content, {})?.label || 'Partners', parseJson<Record<string, string>>(partners?.contentAm, {})?.label || 'አጋሮች'),
      title: bf(parseJson<Record<string, string>>(partners?.content, {})?.title || 'Trusted Partners', parseJson<Record<string, string>>(partners?.contentAm, {})?.title || 'የታመኑ አጋሮች'),
    },
    cta: {
      label: bf(ctaEn?.label || '', ctaAm?.label || ''),
      title: bf(ctaEn?.title || 'Partner With Us', ctaAm?.title || 'ከእኛ ጋር አጋር ይሁኑ'),
      desc: bf(ctaEn?.desc || '', ctaAm?.desc || ''),
      partnershipBtn: bf(ctaEn?.partnershipBtn || 'Partnership', ctaAm?.partnershipBtn || 'አጋርነት'),
      inquiryBtn: bf(ctaEn?.inquiryBtn || 'Inquiry', ctaAm?.inquiryBtn || 'ጥያቄ'),
    },
  };
}
