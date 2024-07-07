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
    <View className="flex flex-row justify-center items-center">
      {icon}
      <Text textStyle="mx-1">{count}</Text>
    </View>
  );
};

export default IconWithCount;
