import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatusBoxProps {
  title: string;
  value: string;
  valueColor: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const StatusBox = ({ title, value, valueColor, icon }: StatusBoxProps) => (
  <View className="flex-1 bg-white/10 rounded-lg p-2 border border-white/5">
    <View className="flex-row items-center justify-start gap-1">
      <View className="w-5 h-5 rounded-md bg-black/20 items-center justify-center">
        <Ionicons name={icon} size={12} color={valueColor} />
      </View>
      <Text className="text-gray-400 text-[10px]">{title}</Text>
    </View>
    <Text style={{ color: valueColor }} className="text-sm">
      {value}
    </Text>
  </View>
);

export default StatusBox;
