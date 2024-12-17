import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_CODES, changeLanguage, LanguageCode } from '../i18n/i18n';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as LanguageCode;

  return (
    <View className="p-4">
      <Text className="text-lg mb-2">{t('common.language')}:</Text>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          className={`p-2 rounded-lg border ${
            currentLanguage === LANGUAGE_CODES.ENGLISH
              ? 'bg-blue-500 border-blue-600'
              : 'border-gray-300'
          }`}
          onPress={() => changeLanguage(LANGUAGE_CODES.ENGLISH)}
        >
          <Text
            className={`${
              currentLanguage === LANGUAGE_CODES.ENGLISH
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {t('common.english')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`p-2 rounded-lg border ${
            currentLanguage === LANGUAGE_CODES.GEORGIAN
              ? 'bg-blue-500 border-blue-600'
              : 'border-gray-300'
          }`}
          onPress={() => changeLanguage(LANGUAGE_CODES.GEORGIAN)}
        >
          <Text
            className={`${
              currentLanguage === LANGUAGE_CODES.GEORGIAN
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {t('common.georgian')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
