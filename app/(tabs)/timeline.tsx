import { Text, View } from "react-native";

export default function TimelineScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">
        Wedding Timeline
      </Text>
      <Text className="mt-3 text-gray-600">
        Schedule and important dates for your wedding
      </Text>
    </View>
  );
}
