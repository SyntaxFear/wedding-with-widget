import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ka" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleLanguage}
      className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex-row items-center space-x-2 gap-2"
    >
      <Image
        source={
          i18n.language === "ka"
            ? require("../../../assets/usaflag.png")
            : require("../../../assets/geoflag.png")
        }
        style={{ width: 20, height: 14, borderRadius: 2 }}
        contentFit="cover"
      />
      <Text className="font-medium text-gray-900">
        {i18n.language === "en" ? "GEO" : "ENG"}
      </Text>
    </TouchableOpacity>
  );
};
