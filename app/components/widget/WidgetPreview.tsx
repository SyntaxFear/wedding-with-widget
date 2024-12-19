import { View, Text } from "react-native";
import { Image } from "expo-image";
import { StatusBox } from "./StatusBox";

interface WidgetPreviewProps {
  carName: string;
  carYear: string;
  imageUri: string | null;
  imageScale: number;
  imagePosition: { x: number; y: number };
}

export const WidgetPreview = ({
  carName,
  carYear,
  imageUri,
  imageScale,
  imagePosition,
}: WidgetPreviewProps) => {
  return (
    <View 
      className="w-full aspect-[4/2] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-6"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
    >
      <View className="flex-1 flex-row p-3">
        {/* Left Section: Info */}
        <View className="w-[60%] z-20">
          {/* Car Info Header */}
          <View className="mb-auto">
            <Text className="text-white text-xl">{carName}</Text>
            <Text className="text-gray-400 text-xs">{carYear}</Text>
          </View>

          <View className="flex-col gap-1">
            <View className="flex-row gap-1">
              <StatusBox
                title="Tech Status"
                value="Valid"
                valueColor="#22C55E"
                icon="checkmark-circle"
              />
              <StatusBox
                title="Next Check"
                value="23d"
                valueColor="#F97316"
                icon="time"
              />
            </View>
            <View className="flex-row gap-1">
              <StatusBox
                title="Total Fines"
                value="12"
                valueColor="#FFFFFF"
                icon="document-text"
              />
              <StatusBox
                title="Unpaid"
                value="3"
                valueColor="#EF4444"
                icon="warning"
              />
            </View>
          </View>
        </View>

        {/* Right Section: Car Image */}
        <View
          className="absolute w-[60%] h-[100%] justify-center items-center z-20"
          style={{
            transform: [{ scale: imageScale }],
            left: imagePosition.x,
            top: imagePosition.y,
          }}
        >
          {/* Shadow wrapper */}
          <View
            style={{
              width: "100%",
              height: "100%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 16,
              },
              shadowOpacity: 0.8,
              shadowRadius: 24,
              elevation: 32,
            }}
          >
            <Image
              source={imageUri ? { uri: imageUri } : require("../../../assets/removed_bg.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="contain"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WidgetPreview;
