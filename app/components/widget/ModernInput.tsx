import { TextInput } from "react-native";

interface ModernInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export const ModernInput = ({
  value,
  onChangeText,
  placeholder,
}: ModernInputProps) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#9CA3AF"
    className="w-full h-12 px-4 bg-gray-100/90 rounded-xl text-gray-800 font-medium shadow-sm"
  />
);

export default ModernInput;
