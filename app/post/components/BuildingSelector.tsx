import { buildingOptions, buildingTypeSchema } from "@/types/post/type";
import React from "react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { z } from "zod";
import { icons } from "@/constants";

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
    <View className="flex-row justify-between my-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <>
              {buildingOptions.map(({ type, label, icon }) => (
                <TouchableOpacity
                  key={type}
                  className="relative justify-evenly items-center bg-primary w-20 h-20 rounded-lg mr-3"
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
