import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  HAS_COMPLETED_ONBOARDING: "has_completed_onboarding",
} as const;

export const setOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, "true");
  } catch (error) {
    console.error("Error setting onboarding complete:", error);
  }
};

export const checkIsFirstLaunch = async () => {
  try {
    const hasCompletedOnboarding = await AsyncStorage.getItem(
      STORAGE_KEYS.HAS_COMPLETED_ONBOARDING
    );
    return hasCompletedOnboarding === null;
  } catch (error) {
    console.error("Error checking first launch:", error);
    return false;
  }
};
