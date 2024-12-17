import { Text, View } from "react-native";

export default function BudgetScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Budget Tracker</Text>
      <Text className="mt-3 text-gray-600">
        Track and manage your wedding expenses
      </Text>
    </View>
  );
}
