import { buildingTypeSchema } from "@/types/post/type";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { z } from "zod";

type BuildingType = z.infer<typeof buildingTypeSchema>;

type BuildingSelectorProps = {
  onBuildingTypeChange: (type: BuildingType) => void;
};

const BuildingSelector = ({ onBuildingTypeChange }: BuildingSelectorProps) => {
  // state
  const [buildingType, setBuildingType] = useState<BuildingType>("OFFICETEL");

  const handleBuildingType = (type: BuildingType) => {
    onBuildingTypeChange(type);
    setBuildingType(type);
  };

  return (
    <View style={styles.building_container}>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "OFFICETEL" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("OFFICETEL")}
      >
        <FontAwesome
          name="building"
          size={24}
          color={buildingType === "OFFICETEL" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "OFFICETEL" && styles.buttonTextSelected,
          ]}
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
          color={buildingType === "APARTMENT" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "APARTMENT" && styles.buttonTextSelected,
          ]}
        >
          아파트
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "HOUSE" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("HOUSE")}
      >
        <FontAwesome6
          name="house-chimney"
          size={24}
          color={buildingType === "HOUSE" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "HOUSE" && styles.buttonTextSelected,
          ]}
        >
          주택
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.building_item,
          buildingType === "VILLA" && styles.selected_building_item,
        ]}
        onPress={() => handleBuildingType("VILLA")}
      >
        <FontAwesome5
          name="building"
          size={24}
          color={buildingType === "VILLA" ? "#22c55e" : "#000"}
        />
        <Text
          style={[
            styles.buttonText,
            buildingType === "VILLA" && styles.buttonTextSelected,
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
    borderWidth: 2,
    opacity: 0.4,
  },
  selected_building_item: {
    borderColor: "#22c55e",
    opacity: 1,
    borderWidth: 2,
    transform: [{ translateY: -2 }],
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
