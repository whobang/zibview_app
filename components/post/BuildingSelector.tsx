import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export type BuildingType = "APARTMENT" | "house" | "villa" | "officetel" | null;

type BuildingSelectorProps = {
  onBuildingTypeChange: (type: BuildingType) => void;
};

const BuildingSelector = ({ onBuildingTypeChange }: BuildingSelectorProps) => {
  // state
  const [buildingType, setBuildingType] = useState<BuildingType>("officetel");

  const handleBuildingType = (type: BuildingType) => {
    onBuildingTypeChange(type);
    setBuildingType(type);
  };

  return (
    <View style={styles.building_container}>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "officetel" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("officetel")}
      >
        <FontAwesome
          name="building"
          size={24}
          color={buildingType === "officetel" ? "#000" : "#d1d5db"}
        />
        <Text
          style={
            buildingType === "officetel"
              ? styles.text
              : styles.selectedBuildingText
          }
        >
          오피스텔
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "APARTMENT" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("APARTMENT")}
      >
        <MaterialIcons
          name="apartment"
          size={24}
          color={buildingType === "APARTMENT" ? "#000" : "#d1d5db"}
        />
        <Text
          style={
            buildingType === "APARTMENT"
              ? styles.text
              : styles.selectedBuildingText
          }
        >
          아파트
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "house" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("house")}
      >
        <FontAwesome6
          name="house-chimney"
          size={24}
          color={buildingType === "house" ? "#000" : "#d1d5db"}
        />
        <Text
          style={
            buildingType === "house" ? styles.text : styles.selectedBuildingText
          }
        >
          주택
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "villa" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("villa")}
      >
        <FontAwesome5
          name="building"
          size={24}
          color={buildingType === "villa" ? "#000" : "#d1d5db"}
        />
        <Text
          style={
            buildingType === "villa" ? styles.text : styles.selectedBuildingText
          }
        >
          빌라
        </Text>
      </Pressable>
    </View>
  );
};

export default BuildingSelector;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  building_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  building_item: {
    width: "20%",
    rowGap: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  selected_building_item: {
    borderColor: "#000",
  },
  text: { color: "#000" },
  selectedBuildingText: {
    color: "#d1d5db",
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  button: {
    padding: 12,
    backgroundColor: "#22c55e",
    borderWidth: 1,
    borderColor: "#22c55e",
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
    borderRadius: 5,
    textAlign: "center",
  },
});
