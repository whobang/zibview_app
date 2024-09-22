import {
  Building,
  Building2,
  Hotel,
  House,
  ScanSearch,
  Search,
} from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import clsx from "clsx";

type TransactionType = "매매" | "전월세";
type BuildingType = "아파트" | "연립다세대" | "오피스텔" | "다가구";
const transactionTypes = ["매매", "전월세"];
const buildingTypes = [
  {
    icon: Building2,
    text: "아파트",
  },
  {
    icon: Hotel,
    text: "연립다세대",
  },
  {
    icon: Building,
    text: "오피스텔",
  },
  {
    icon: House,
    text: "다가구",
  },
];

const Ranking = () => {
  const [transactionTypeActive, setTransactionTypeActive] =
    useState<TransactionType>("매매");
  const [buildingTypeActive, setBuildingTypeActive] =
    useState<BuildingType>("아파트");

  return (
    <View className="m-2 mb-4">
      <View className="flex-row justify-between mx-1 pb-2 ">
        <Text className="font-semibold text-base">일간 실시간 랭킹</Text>
        <Search color="#ff9c01" />
      </View>

      <View style={styles.shadow}>
        <Text className="text-xs mb-1 text-gray-600 font-semibold">
          12월 12일 14:23 기준
        </Text>
        <View className="flex-row mb-1">
          {/* 매매 / 전월세  */}
          <View className="flex-row gap-x-1 justify-center mr-2">
            {transactionTypes.map((transactionType) => (
              <Pressable
                key={transactionType}
                onPress={() =>
                  setTransactionTypeActive(transactionType as TransactionType)
                }
                className={clsx(
                  "px-1 py-1 rounded-sm border border-primary-100",
                  {
                    "bg-primary-100/60":
                      transactionTypeActive === transactionType,
                  }
                )}
              >
                <Text
                  className={clsx("text-primary-200", {
                    "text-white": transactionTypeActive === transactionType,
                  })}
                >
                  {transactionType}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* 아파트 / 연립다세대 / 오피스텔 / 다가구 */}
          <ScrollView
            className="w-full"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {buildingTypes.map((buildingType) => (
              <Pressable
                key={buildingType.text}
                onPress={() =>
                  setBuildingTypeActive(buildingType.text as BuildingType)
                }
                className={clsx(
                  "flex-row items-center px-1 border border-blue-400 rounded-sm mr-1",
                  {
                    "bg-blue-100": buildingType.text === buildingTypeActive,
                  }
                )}
              >
                <buildingType.icon size={15} className="border-blue-400" />
                <Text className="text-blue-700 ml-1">{buildingType.text}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 랭킹 리스트 */}
        <View className="flex-[3] justify-between">
          {Array.from({ length: 5 }, (v, i) => (
            <View
              key={i + new Date().toString()}
              className={`flex-row py-0.5 ${
                i === 4 ? "" : "border-b border-gray-300"
              }`}
            >
              <Text className="flex-1 text-center my-auto text-xs">
                {i + 1}
              </Text>
              <View className="flex-[10]">
                <Text className="text-xs">서울시 강남구 강남 아파트</Text>
              </View>
              <View className="flex-3 flex-row  items-center">
                <ScanSearch color="black" size={15} className="mr-1" />
                <Text className="text-xs">1,557</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default React.memo(Ranking);

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
