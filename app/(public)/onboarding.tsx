import { View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Onboarding } from "../components/features/onboarding/Onboarding";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useCallback } from "react";

export default function OnboardingScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; 
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  const handleComplete = async () => {
    await AsyncStorage.setItem("has_completed_onboarding", "true");
    router.replace("/(auth)/(tabs)/home");
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("has_completed_onboarding", "true");
    router.replace("/(auth)/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="dark" />
      <Onboarding onComplete={handleComplete} onSkip={handleSkip} />
    </View>
  );
}
