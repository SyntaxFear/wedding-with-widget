import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import "./i18n/i18n";
import { checkIsFirstLaunch } from "./utils/storage";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(public)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!loaded) return;

    async function initializeApp() {
      try {
        const isFirst = await checkIsFirstLaunch();
        const firstSegment = segments[0];

        if (isFirst) {
          if (firstSegment !== "(public)") {
            router.replace("/(public)/onboarding");
          }
        } else {
          if (!firstSegment || firstSegment === "(public)") {
            router.replace("/(auth)/(tabs)/home");
          }
        }
      } catch (e) {
        console.error("Error in initializeApp:", e);
        router.replace("/(public)/onboarding");
      } finally {
        SplashScreen.hideAsync();
      }
    }

    initializeApp();
  }, [loaded, segments]);

  if (!loaded) {
    return <View className="flex-1 bg-white" />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(public)"
            options={{
              headerShown: false,
              animation: "fade",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
