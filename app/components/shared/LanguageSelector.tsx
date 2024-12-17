import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

type LanguageSelectorProps = {
  variant?: "full" | "minimal";
};

export const LanguageSelector = ({ variant = "full" }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ka" : "en";
    i18n.changeLanguage(newLanguage);
  };

  if (variant === "minimal") {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleLanguage}
        className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex-row items-center space-x-2"
      >
        <Image
          source={
            i18n.language === "en"
              ? require("../../../assets/usaflag.png")
              : require("../../../assets/geoflag.png")
          }
          className="w-5 h-5 rounded-full"
          contentFit="cover"
        />
        <Text className="font-medium text-gray-900">
          {i18n.language === "en" ? "GEO" : "ENG"}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <BlurView intensity={20} tint="light" className="overflow-hidden rounded-xl">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleLanguage}
        className="flex-row items-center px-4 py-2 space-x-2"
      >
        <Image
          source={
            i18n.language === "en"
              ? require("../../../assets/usaflag.png")
              : require("../../../assets/geoflag.png")
          }
          className="w-6 h-6 rounded-full"
          contentFit="cover"
        />
        <Text className="text-base font-medium">
          {i18n.language === "en" ? "English" : "ქართული"}
        </Text>
      </TouchableOpacity>
    </BlurView>
  );
};
