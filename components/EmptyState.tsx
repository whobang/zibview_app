import { View, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButtom";
import { router } from "expo-router";
import Text from "@/components/Text";

type Props = {
  title: string;
  subtitle: string;
  buttonTitle: string;
  containerStyles?: string;
};

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  containerStyles,
}: Props) => {
  return (
    <View className={`justify-center items-center px-4 ${containerStyles}`}>
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text textStyle="text-2xl text-center text-primary-200 mb-2">
        {title}
      </Text>
      <Text textStyle="text-sm text-primary-200">{subtitle}</Text>
      <CustomButton
        title={buttonTitle}
        onPress={() => router.push("post/(auth)/address")}
        containerStyles="w-full my-4"
      />
    </View>
  );
};

export default EmptyState;
