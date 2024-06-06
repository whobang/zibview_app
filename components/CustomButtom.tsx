import { Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-white font-jregular text-lg  ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
