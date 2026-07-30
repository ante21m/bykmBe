export interface RawAboutSection {
  id: string;
  sectionKey: string;
  title: string;
  titleAm?: string;
  content: string;
  contentAm?: string;
  sortOrder: number;
  active: boolean;
}

export interface BilingualField {
  en: string;
  am: string;
}

function bf(en: string, am: string): BilingualField {
  return { en, am };
}

export interface AboutApiData {
  overview: BilingualField;
  mission: BilingualField;
  vision: BilingualField;
  values: BilingualField;
  history: BilingualField;
}

export function transformAboutSections(sections: RawAboutSection[]): AboutApiData | null {
  const get = (key: string) => sections.find(s => s.sectionKey === key);
  const overview = get('overview');
  const mission = get('mission');
  const vision = get('vision');
  const values = get('values');
  const history = get('history');

  if (!overview) return null;

  return {
    overview: bf(overview.content, overview.contentAm || ''),
    mission: bf(mission?.content || '', mission?.contentAm || ''),
    vision: bf(vision?.content || '', vision?.contentAm || ''),
    values: bf(values?.content || '', values?.contentAm || ''),
    history: bf(history?.content || '', history?.contentAm || ''),
  };
}
