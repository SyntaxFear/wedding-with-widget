import { Pressable, Text } from "react-native";

interface ControlButtonProps {
  onPress: () => void;
  label: string;
  isSmall?: boolean;
}

export const ControlButton = ({
  onPress,
  label,
  isSmall = false,
}: ControlButtonProps) => (
  <Pressable
    onPress={onPress}
    className={`${
      isSmall ? "px-4 py-2.5" : "px-5 py-3"
    } bg-gray-100 rounded-xl shadow-sm`}
    style={({ pressed }) => ({
      transform: [{ scale: pressed ? 0.97 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      className={`${
        isSmall ? "text-xs" : "text-sm"
      } text-gray-700 font-medium text-center`}
    >
      {label}
    </Text>
  </Pressable>
);

export default ControlButton;
