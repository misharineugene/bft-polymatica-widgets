import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//
import ru from './ru-RU.json';
import en from './en-US.json';

const resources = {
  ru: { translation: ru },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
});

export default i18n;
