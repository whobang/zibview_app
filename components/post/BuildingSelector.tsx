import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export type BuildingType = "apartment" | "house" | "villa" | "officetel" | null;

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
          color={buildingType === "officetel" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "officetel" && styles.buttonTextSelected,
          ]}
        >
          오피스텔
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "apartment" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("apartment")}
      >
        <MaterialIcons
          name="apartment"
          size={24}
          color={buildingType === "apartment" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "apartment" && styles.buttonTextSelected,
          ]}
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
          color={buildingType === "house" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "house" && styles.buttonTextSelected,
          ]}
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
          color={buildingType === "villa" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "villa" && styles.buttonTextSelected,
          ]}
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
    marginVertical: 10,
  },
  building_item: {
    width: "20%",
    rowGap: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    opacity: 0.4,
  },
  selected_building_item: {
    borderColor: "#22c55e",
    opacity: 1,
    borderWidth: 2,
  },
  selectedBuildingText: {
    color: "#22c55e",
  },
  buttonTextSelected: {
    color: "#22c55e",
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
  },
});
