import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem("has_completed_onboarding");
    router.replace("/(public)/onboarding");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14 pb-4">
        <TouchableOpacity
          onPress={handleResetOnboarding}
          className="self-end flex-row items-center py-2 px-4 rounded-xl bg-gray-100"
        >
          <Ionicons name="refresh" size={16} color="#4B5563" className="mr-2" />
          <Text className="text-gray-600 font-medium">
            {t("common.resetOnboarding")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-900">
          {t("tabs.home")}
        </Text>
      </View>
    </View>
  );
}
