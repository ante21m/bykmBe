'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Lang } from './translations';

type TranslationContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  translations: typeof translations;
};

const TranslationContext = createContext<TranslationContextType>({
  lang: 'en',
  setLang: () => {},
  translations,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <TranslationContext.Provider value={{ lang, setLang, translations }}>
      <div lang={lang} dir="ltr">
        {children}
      </div>
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
