import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslations from './locales/pl/translation.json';
import enTranslations from './locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: plTranslations },
      en: { translation: enTranslations },
    },
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;