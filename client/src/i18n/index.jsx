import { createContext, useContext, useState, useEffect } from 'react';
import tr from './tr.json';
import en from './en.json';
import ar from './ar.json';

const translations = { tr, en, ar };

const I18nContext = createContext();

function detectLanguage() {
  const saved = localStorage.getItem('gampas-lang');
  if (saved && translations[saved]) return saved;

  const browserLang = navigator.language || navigator.userLanguage || 'en';
  const lang = browserLang.toLowerCase().split('-')[0];

  if (lang === 'tr') return 'tr';
  if (lang === 'ar') return 'ar';
  return 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  useEffect(() => {
    localStorage.setItem('gampas-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
