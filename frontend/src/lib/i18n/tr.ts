import { type Lang } from './translations';

type TranslationValue = { en: string; am: string };

export function tr(obj: TranslationValue, lang: Lang): string {
  return lang === 'en' ? obj.en : obj.am;
}
