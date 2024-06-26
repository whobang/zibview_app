import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <ChevronLeft size={32} color="#FF9C01" strokeWidth={2} />
    </TouchableOpacity>
  );
};

export default BackButton;
