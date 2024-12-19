import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ArrowButton } from "./ArrowButton";
import { ControlButton } from "./ControlButton";

interface PositionControlsProps {
  onMove: (x: number, y: number) => void;
}

export const PositionControls = ({ onMove }: PositionControlsProps) => {
  return (
    <View className="mb-6 border p-4 border-gray-200 rounded-xl">
      <View className="items-center mb-4">
        <ArrowButton
          onPress={() => onMove(0, -10)}
          icon="chevron-up"
        />
        <View className="flex-row justify-center items-center">
          <ArrowButton
            onPress={() => onMove(-10, 0)}
            icon="chevron-back"
          />
          <View className="w-14 h-14 m-1.5 rounded-2xl bg-gray-100/50 items-center justify-center">
            <Ionicons name="move" size={28} color="#94A3B8" />
          </View>
          <ArrowButton
            onPress={() => onMove(10, 0)}
            icon="chevron-forward"
          />
        </View>
        <ArrowButton
          onPress={() => onMove(0, 10)}
          icon="chevron-down"
        />
      </View>

      {/* Fine Position Controls */}
      <View className="flex-row justify-between mt-4 space-x-2">
        <ControlButton
          onPress={() => onMove(-1, 0)}
          label="-1px X"
          isSmall
        />
        <ControlButton
          onPress={() => onMove(1, 0)}
          label="+1px X"
          isSmall
        />
        <ControlButton
          onPress={() => onMove(0, -1)}
          label="-1px Y"
          isSmall
        />
        <ControlButton
          onPress={() => onMove(0, 1)}
          label="+1px Y"
          isSmall
        />
      </View>
    </View>
  );
};

export default PositionControls;
