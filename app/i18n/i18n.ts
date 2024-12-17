import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../translations/en.json';
import ka from '../translations/ka.json';

export type LanguageCode = 'en' | 'ka';

export const LANGUAGE_CODES: Record<string, LanguageCode> = {
  ENGLISH: 'en',
  GEORGIAN: 'ka',
};

const languageDetector = {
  init: () => {},
  type: 'languageDetector' as const,
  detect: async (): Promise<LanguageCode> => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user-language');
      return (savedLanguage as LanguageCode) ?? LANGUAGE_CODES.ENGLISH;
    } catch (error) {
      console.log('Error reading language from async storage:', error);
      return LANGUAGE_CODES.ENGLISH;
    }
  },
  cacheUserLanguage: async (lng: LanguageCode) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.log('Error saving language to async storage:', error);
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      [LANGUAGE_CODES.ENGLISH]: {
        translation: en,
      },
      [LANGUAGE_CODES.GEORGIAN]: {
        translation: ka,
      },
    },
    fallbackLng: LANGUAGE_CODES.ENGLISH,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Function to change language
export const changeLanguage = async (language: LanguageCode) => {
  await i18n.changeLanguage(language);
  await languageDetector.cacheUserLanguage(language);
};

export default i18n;
