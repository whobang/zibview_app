import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import { MapPinHouse } from "lucide-react-native"; // Assuming 'MapPin' is a valid export
import { IJibun } from "../[postId]";

type Props = {
  buildingName: string;
  sigunguBuildingName: string;
  roadNameAddress: string;
  jibunAddress: string;
  sigungu: string;
  emd: string;
  jibuns: IJibun[];
};

const BuildingInfo = ({
  buildingName,
  sigunguBuildingName,
  roadNameAddress,
  jibunAddress,
  sigungu,
  emd,
  jibuns = [],
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>();

  const jibun = jibuns.length > 0 ? jibuns[0] : undefined;

  return (
    <View className="px-4">
      <View className="flex-row py-2">
        <Text className="font-semibold text-lg mr-1">
          {buildingName || sigunguBuildingName}
        </Text>
        <Text className="mt-auto">
          {sigungu} {emd}
        </Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>주요용도명</Text>
        <Text className="font-semibold">{jibun?.mainPurposeName}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>기타용도명</Text>
        <Text className="font-semibold">{jibun?.etcPurposeName}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>지상층수</Text>
        <Text className="font-semibold">{jibun?.groundFloorCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>지하층수</Text>
        <Text className="font-semibold">{jibun?.undergroundFloorCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>세대수</Text>
        <Text className="font-semibold">{jibun?.houseHoldCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>호수</Text>
        <Text className="font-semibold">{jibun?.hoCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>승강기수</Text>
        <Text className="font-semibold">{jibun?.elevatorCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>비상용 승강기수</Text>
        <Text className="font-semibold">{jibun?.emergencyElevatorCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>옥내기계식대수</Text>
        <Text className="font-semibold">
          {jibun?.indoorMechanicalParkingCount}
        </Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>옥외기계식대수</Text>
        <Text className="font-semibold">
          {jibun?.outdoorMechanicalParkingCount}
        </Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>옥내자주식대수</Text>
        <Text className="font-semibold">{jibun?.indoorSelfParkingCount}</Text>
      </View>
      <View className="flex-row justify-between py-1 my-1 border-b border-slate-200">
        <Text>옥외자주식대수</Text>
        <Text className="font-semibold">{jibun?.outdoorSelfParkingCount}</Text>
      </View>
      <ListItem.Accordion
        className="-ml-3 -mt-1"
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
        content={
          <>
            <MapPinHouse size="20" color="black" className="mr-2" />
            <ListItem.Title className="text-sm">주소 보기</ListItem.Title>
          </>
        }
      >
        <ListItem bottomDivider>
          <ListItem.Content className="-ml-3 -mt-4">
            <ListItem.Subtitle className="text-sm">
              {roadNameAddress}
            </ListItem.Subtitle>
            <ListItem.Subtitle className="text-sm">
              {jibunAddress}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default BuildingInfo;
