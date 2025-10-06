import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vn from '@/locales/vi.json';
import en from '@/locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vn,
    },
  },
  lng: 'en',
  fallbackLng: 'vi',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
