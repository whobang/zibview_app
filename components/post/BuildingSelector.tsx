import { buildingTypeSchema } from "@/types/post/type";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { z } from "zod";

// options
const buildingOptions = [
  {
    type: "OFFICETEL",
    label: "오피스텔",
    Icon: FontAwesome,
    iconName: "building",
  },
  {
    type: "APARTMENT",
    label: "아파트",
    Icon: MaterialIcons,
    iconName: "apartment",
  },
  {
    type: "HOUSE",
    label: "주택",
    Icon: FontAwesome6,
    iconName: "house-chimney",
  },
  { type: "VILLA", label: "빌라", Icon: FontAwesome5, iconName: "building" },
];

// type
type BuildingType = z.infer<typeof buildingTypeSchema>;
type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  defaultValue: BuildingType;
};

/**
 * @description 건물 타입 선택 컴포넌트
 */
const BuildingSelector = <T extends FieldValues>({
  name,
  control,
  defaultValue,
}: Props<T>) => {
  // state
  const [buildingType, setBuildingType] = useState<BuildingType>(defaultValue);

  const handleBuildingType = (type: BuildingType) => {
    setBuildingType(type);
  };

  // building option을 렌더링하는 함수
  const renderBuildingOption = (
    onChange: (value: BuildingType) => void,
    type: BuildingType,
    label: string,
    iconName: string,
    IconComponent: React.ComponentType<{
      name: string;
      size: number;
      color: string;
    }>
  ) => (
    <Pressable
      key={type}
      style={[
        styles.building_item,
        buildingType === type && styles.selected_building_item,
      ]}
      onPress={() => {
        handleBuildingType(type);
        onChange(type);
      }}
    >
      <IconComponent
        name={iconName}
        size={24}
        color={buildingType === type ? "#22c55e" : "#000"}
      />
      <Text
        style={[
          styles.buttonText,
          buildingType === type && styles.buttonTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  // view
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return (
          <View style={styles.building_container}>
            <View style={styles.building_container}>
              {buildingOptions.map(({ type, label, Icon, iconName }) =>
                renderBuildingOption(
                  onChange,
                  type as BuildingType,
                  label,
                  iconName,
                  Icon
                )
              )}
            </View>
          </View>
        );
      }}
    />
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
