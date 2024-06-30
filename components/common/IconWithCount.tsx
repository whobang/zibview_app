import React from "react";
import { View } from "react-native";
import Text from "@/components/Text";

const IconWithCount = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: number;
}) => {
  return (
    <View className="flex-row justify-center items-center">
      <Text textStyle="mr-0.5">{icon}</Text>
      <Text textStyle="mr-2">{count}</Text>
    </View>
  );
};

export default IconWithCount;
