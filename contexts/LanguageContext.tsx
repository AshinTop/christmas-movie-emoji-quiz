import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations, TranslationKey } from '../services/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <K extends TranslationKey>(key: K) => typeof translations.en[K];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = <K extends TranslationKey>(key: K): typeof translations.en[K] => {
    // Cast is necessary because TypeScript cannot guarantee that translations[language][key]
    // strictly matches typeof translations.en[K] when language is dynamic ('en' | 'zh'),
    // even though the structure is symmetric.
    const value = translations[language][key];
    return (value !== undefined ? value : key) as typeof translations.en[K];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};