'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load saved language on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('vanijya-language') as Language;
      if (savedLanguage && ['en', 'hi', 'ta', 'te', 'kn', 'mr'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('vanijya-language', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation function
const getTranslation = (key: string, language: Language): string => {
  const translations = getTranslations();
  return translations[language]?.[key] || translations['en'][key] || key;
};

// Import translations
const getTranslations = () => {
  return require('../lib/translations.json');
};