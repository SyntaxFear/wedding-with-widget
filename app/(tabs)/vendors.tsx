import { Text, View } from "react-native";

export default function VendorsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">
        Vendors & Services
      </Text>
      <Text className="mt-3 text-gray-600">
        Manage your wedding vendors and services
      </Text>
    </View>
  );
}
