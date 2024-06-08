import { BuildingType, buildingOptions } from "@/types/post/type";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "@/components/Text";

type Props = {
  buildingName: string;
  buildingType: BuildingType;
  address: string;
};

const BuildingInfo = ({ buildingName, buildingType, address }: Props) => {
  const buildingOption =
    buildingOptions.find((option) => option.type === buildingType) ||
    buildingOptions[0];

  return (
    <View style={styles.user_info_container}>
      <View style={{ flex: 8, justifyContent: "space-evenly", rowGap: 5 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
        >
          {buildingName && <Text textStyle="text-2xl">{buildingName}</Text>}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <Image source={buildingOption.icon} />
            <Text textStyle="underline text-primary">
              {buildingOption.label}
            </Text>
          </View>
        </View>
        <Text>{address}</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "flex-end",
          justifyContent: "center",
          rowGap: 5,
        }}
      ></View>
    </View>
  );
};

export default BuildingInfo;

const styles = StyleSheet.create({
  user_info_container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eaeaea",
  },
});
