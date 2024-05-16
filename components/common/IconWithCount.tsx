import React from "react";
import { View, Text } from "react-native";

const IconWithCount = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: number;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ marginRight: 2 }}>{icon}</Text>
      <Text>{count}</Text>
    </View>
  );
};

export default IconWithCount;
