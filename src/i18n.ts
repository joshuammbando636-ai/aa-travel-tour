import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true, // Set to false in production
    ns: [
      'common', 
      'home', 
      'about', 
      'visa', 
      'wild', 
      'packages', 
      'eco', 
      'explorer', 
      'contact', 
      'CMT', 
      'blog', 
      'air',
      'conv',
      'test',
      'airline',
      'footer',
      'service',
      'core',
      'proof',
      'cookie'
    ],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Prevents suspense issues
    },
  });

export default i18n;