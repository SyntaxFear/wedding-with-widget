import { View } from "react-native";
import { ControlButton } from "./ControlButton";

interface ScaleControlsProps {
  onScale: (delta: number) => void;
}

export const ScaleControls = ({ onScale }: ScaleControlsProps) => {
  return (
    <View className="space-y-4 gap-4 border p-4 rounded-xl border-gray-200">
      {/* Large Scale Adjustments */}
      <View className="flex-row justify-between space-x-3">
        <ControlButton onPress={() => onScale(-0.1)} label="-0.1" />
        <ControlButton onPress={() => onScale(-0.05)} label="-0.05" />
        <ControlButton onPress={() => onScale(0.05)} label="+0.05" />
        <ControlButton onPress={() => onScale(0.1)} label="+0.1" />
      </View>

      {/* Fine Scale Adjustments */}
      <View className="flex-row justify-between space-x-2">
        <ControlButton
          onPress={() => onScale(-0.01)}
          label="-0.01"
          isSmall
        />
        <ControlButton
          onPress={() => onScale(-0.005)}
          label="-0.005"
          isSmall
        />
        <ControlButton
          onPress={() => onScale(0.005)}
          label="+0.005"
          isSmall
        />
        <ControlButton
          onPress={() => onScale(0.01)}
          label="+0.01"
          isSmall
        />
      </View>
    </View>
  );
};

export default ScaleControls;
