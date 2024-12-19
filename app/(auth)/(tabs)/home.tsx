import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { ModernInput } from "../../components/widget/ModernInput";
import ImagePicker from "../../components/widget/ImagePicker";
import { WidgetPreview } from "../../components/widget/WidgetPreview";
import { PositionControls } from "../../components/widget/PositionControls";
import { ScaleControls } from "../../components/widget/ScaleControls";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WIDGET_STATE_KEY = "@widget_state";

interface WidgetState {
  carName: string;
  carYear: string;
  imagePosition: { x: number; y: number };
  imageScale: number;
  imageUri: string | null;
}

function HomeScreen() {
  const [carName, setCarName] = useState("BMW M4");
  const [carYear, setCarYear] = useState("Competition 2023");
  const [imagePosition, setImagePosition] = useState({ x: -30, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved state when app opens
  useEffect(() => {
    loadSavedState();
  }, []);

  const loadSavedState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(WIDGET_STATE_KEY);
      if (savedState) {
        const state: WidgetState = JSON.parse(savedState);
        setCarName(state.carName);
        setCarYear(state.carYear);
        setImagePosition(state.imagePosition);
        setImageScale(state.imageScale);
        setImageUri(state.imageUri);
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
  };

  // Save state whenever it changes
  const saveState = async () => {
    try {
      const state: WidgetState = {
        carName,
        carYear,
        imagePosition,
        imageScale,
        imageUri,
      };
      await AsyncStorage.setItem(WIDGET_STATE_KEY, JSON.stringify(state));

      // Save to local file that widget can access
      const widgetData = {
        carName,
        year: carYear,
        techStatus: "Valid",
        nextInspection: "23d",
        totalFines: 12,
        unpaidFines: 3,
        lastUpdated: new Date().toISOString(),
        updatableText: "Updated from dashboard",
        imageUri,
        imageScale,
        imagePosition,
      };

      // Save to a shared file that both app and widget can access
      const sharedPath = `${FileSystem.documentDirectory}widget_data.json`;
      await FileSystem.writeAsStringAsync(
        sharedPath,
        JSON.stringify(widgetData)
      );
    } catch (error) {
      console.error("Error saving state:", error);
    }
  };

  // Update widget whenever relevant data changes
  useEffect(() => {
    saveState();
  }, [imagePosition, imageScale, imageUri, carName, carYear]);

  const moveImage = (xDelta: number, yDelta: number) => {
    setImagePosition((prev) => ({
      x: prev.x + xDelta,
      y: prev.y + yDelta,
    }));
  };

  const adjustScale = (delta: number) => {
    setImageScale((prev) => {
      const newScale = Number((prev + delta).toFixed(3));
      return Math.max(0.1, Math.min(2.0, newScale));
    });
  };

  const handleImageSelected = async (uri: string) => {
    try {
      setIsLoading(true);
      console.log("Selected image URI:", uri);

      // Create a new FormData instance
      const formData = new FormData();

      // Get the filename from the URI
      const filename = uri.split("/").pop() || "image.jpg";

      // Append the file to FormData with the correct structure for React Native
      formData.append("image", {
        uri: uri,
        type: "image/jpeg",
        name: filename,
      } as any); // Using 'any' to bypass TypeScript checking for React Native's specific FormData structure

      console.log("Uploading image to remove background...");

      // Call the background removal API
      const response = await fetch(
        "https://bgremove.zinfo.ge/api/remove-background",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "image/png",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to remove background: ${response.status}`);
      }

      // Get the response as blob
      const processedImageBlob = await response.blob();

      // Create a local file path for the processed image
      const processedImagePath = `${FileSystem.documentDirectory}processed_${filename}`;

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(processedImageBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64Image = base64data.split(",")[1];

        try {
          // Save the processed image locally
          await FileSystem.writeAsStringAsync(processedImagePath, base64Image, {
            encoding: FileSystem.EncodingType.Base64,
          });

          console.log("Processed image saved to:", processedImagePath);

          // Update the image URI with the processed image
          setImageUri(`file://${processedImagePath}`);
        } catch (error) {
          console.error("Error saving processed image:", error);
          setImageUri(uri); // Fallback to original image
        }
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error processing image:", error);
      setIsLoading(false);
      // Fallback to original image if processing fails
      setImageUri(uri);
    }
  };

  return (
    <View className="flex-1 bg-gray-300">
      {/* Modern Controls Section */}
      <ScrollView className="flex-1 bg-white pt-16">
        <View className="px-6">
          {/* Image Picker */}
          <ImagePicker
            onImageSelected={handleImageSelected}
            isLoading={isLoading}
          />

          {/* Widget Preview */}
          <WidgetPreview
            carName={carName}
            carYear={carYear}
            imageUri={imageUri}
            imageScale={imageScale}
            imagePosition={imagePosition}
          />

          {/* Car Info Inputs */}
          <View className="mb-4 gap-2">
            <ModernInput
              value={carName}
              onChangeText={setCarName}
              placeholder="Enter car name"
            />
            <ModernInput
              value={carYear}
              onChangeText={setCarYear}
              placeholder="Enter car year/model"
            />
          </View>

          {/* Section Headers with Values */}
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-gray-400 text-xs mb-1">POSITION</Text>
              <Text className="text-gray-800 font-medium">
                X: {imagePosition.x}px, Y: {imagePosition.y}px
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-400 text-xs mb-1">SCALE</Text>
              <Text className="text-gray-800 font-medium">
                {imageScale.toFixed(3)}x
              </Text>
            </View>
          </View>

          {/* Position Controls */}
          <PositionControls onMove={moveImage} />

          {/* Scale Controls */}
          <ScaleControls onScale={adjustScale} />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
