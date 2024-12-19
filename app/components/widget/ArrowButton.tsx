import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ArrowButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}

export const ArrowButton = ({ onPress, icon }: ArrowButtonProps) => (
  <Pressable
    onPress={onPress}
    className="w-14 h-14 bg-blue-500/90 rounded-2xl items-center justify-center m-1.5 shadow-lg"
    style={({ pressed }) => ({
      transform: [{ scale: pressed ? 0.95 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Ionicons name={icon} size={28} color="white" />
  </Pressable>
);

export default ArrowButton;
