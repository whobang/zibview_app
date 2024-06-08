import { Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";

const PlusButton = () => {
  return (
    <TouchableOpacity onPress={() => router.replace("/post/address")}>
      <View className="w-14 h-14 bg-primary-100  rounded-full items-center justify-center">
        <Image source={icons.plus} className="w-6 h-6" />
      </View>
    </TouchableOpacity>
  );
};

export default PlusButton;
