import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_CODES, changeLanguage, LanguageCode } from '../i18n/i18n';

export const HeaderLanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as LanguageCode;

  return (
    <View className="flex-row space-x-2">
      <TouchableOpacity
        className={`px-2 py-1 rounded ${
          currentLanguage === LANGUAGE_CODES.ENGLISH
            ? 'bg-blue-500'
            : 'bg-gray-200'
        }`}
        onPress={() => changeLanguage(LANGUAGE_CODES.ENGLISH)}
      >
        <Text
          className={`text-sm ${
            currentLanguage === LANGUAGE_CODES.ENGLISH
              ? 'text-white'
              : 'text-gray-600'
          }`}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-2 py-1 rounded ${
          currentLanguage === LANGUAGE_CODES.GEORGIAN
            ? 'bg-blue-500'
            : 'bg-gray-200'
        }`}
        onPress={() => changeLanguage(LANGUAGE_CODES.GEORGIAN)}
      >
        <Text
          className={`text-sm ${
            currentLanguage === LANGUAGE_CODES.GEORGIAN
              ? 'text-white'
              : 'text-gray-600'
          }`}
        >
          ქა
        </Text>
      </TouchableOpacity>
    </View>
  );
};
