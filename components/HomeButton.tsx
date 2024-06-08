import { Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { icons } from "@/constants";
import { router } from "expo-router";

const HomeButton = () => {
  return (
    <TouchableOpacity onPress={() => router.replace("(tabs)")}>
      <Image source={icons.home} />
    </TouchableOpacity>
  );
};

export default HomeButton;
