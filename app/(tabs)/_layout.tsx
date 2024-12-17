import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { HeaderLanguageSelector } from "../components/HeaderLanguageSelector";
import { View } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF4B91",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#1F2937",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
          headerRight: () => (
            <View className="mr-4">
              <HeaderLanguageSelector />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: t('tabs.timeline'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="guests"
        options={{
          title: t('tabs.guests'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: t('tabs.budget'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vendors"
        options={{
          title: t('tabs.vendors'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="store" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
