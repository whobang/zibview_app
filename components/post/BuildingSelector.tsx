import { buildingTypeSchema } from "@/types/post/type";
import React from "react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { icons } from "@/constants";

// options
const buildingOptions = [
  {
    type: "OFFICETEL",
    label: "오피스텔",
    icon: icons.building,
  },
  {
    type: "APARTMENT",
    label: "아파트",
    icon: icons.building2,
  },
  {
    type: "HOUSE",
    label: "주택",
    icon: icons.house,
  },
  { type: "VILLA", label: "빌라", icon: icons.villa },
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

  // view
  return (
    <View style={styles.building_container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <>
              {buildingOptions.map(({ type, label, icon }) => (
                <TouchableOpacity
                  key={type}
                  className="relative justify-evenly items-center bg-primary/80 w-20 h-20 rounded-lg mr-3"
                  onPress={() => {
                    handleBuildingType(type as BuildingType);
                    onChange(type);
                  }}
                >
                  {/* 이미지 선택 체크 표시 */}
                  {buildingType === type && (
                    <Image
                      source={icons.check_green}
                      className="absolute z-10 top-0 right-0"
                    />
                  )}
                  <View className="bg-white p-2 rounded-full">
                    <Image source={icon} className="" />
                  </View>
                  <Text className="text-white font-jregular text-base">
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        />
      </ScrollView>
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
