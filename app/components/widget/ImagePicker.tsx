import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

interface Props {
  onImageSelected: (uri: string) => void;
  isLoading?: boolean;
}

const ImagePickerComponent: React.FC<Props> = ({
  onImageSelected,
  isLoading = false,
}) => {
  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll access in your device settings to select images.",
          [{ text: "OK", onPress: () => console.log("Permission denied") }]
        );
        return;
      }

      // Launch image picker
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an error selecting the image. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View className="mb-6">
      <TouchableOpacity
        onPress={pickImage}
        className="bg-gray-100 rounded-xl p-6 items-center justify-center border-2 border-dashed border-gray-300 active:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Image
              source={require("../../../assets/icon.png")}
              className="w-12 h-12 opacity-50 mb-4"
            />
            <Text className="text-gray-600 text-lg font-medium mb-2">
              Select Image
            </Text>
            <Text className="text-gray-400 text-sm text-center">
              Choose an image from your gallery to customize your widget
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
