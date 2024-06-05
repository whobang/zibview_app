import { BuildingType } from "@/types/post/type";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {
  buildingName: string;
  buildingType: BuildingType;
  address: string;
};

const BuildingInfo = ({ buildingName, buildingType, address }: Props) => {
  return (
    <View style={styles.user_info_container}>
      <View style={{ flex: 8, justifyContent: "space-evenly", rowGap: 5 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
        >
          {buildingName && (
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              그린오피스텔
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <AntDesign name="home" size={20} color="black" />
            <Text style={{ textDecorationLine: "underline", color: "#6b7280" }}>
              오피스텔
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
