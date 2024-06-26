import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import TextInput from "@/components/common/TextInput";
import { useRecoilState } from "recoil";
import { addressState } from "@/atom/addressState";
import { router } from "expo-router";
import React from "react";

/**
 * @description 주소 검색 페이지
 */
const SearchAddress = () => {
  // state
  const [address, setAddress] = useRecoilState(addressState);

  const toNextPage = () => {
    if (!address.zonecode || !address.address) {
      Alert.alert("주소를 입력해주세요.");
      return;
    }
    router.push("/post/create");
  };

  return (
    <View className="h-full p-4">
      <Text className="font-jregular text-3xl my-2">주소</Text>
      <View className="flex-row mb-2">
        <TextInput
          placeholder="우편번호"
          containerStyles="flex-1"
          editable={false}
          value={address.zonecode ? address.zonecode.toString() : ""}
        />
        <TouchableOpacity
          onPress={() => router.push("/address/modal")}
          className="justify-center px-4 min-w-[110px] rounded-md bg-primary-200 ml-2"
        >
          <Text className="text-white text-center font-jregular">
            우편번호 찾기
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        containerStyles="mb-2"
        placeholder="지번 주소"
        editable={false}
        value={address.jibunAddress || ""}
      />

      <TextInput
        containerStyles="mb-2"
        placeholder="도로명 주소"
        editable={false}
        value={address.roadAddress || ""}
      />

      <TextInput
        containerStyles="mb-2"
        placeholder="상세주소"
        value={address.detailAddress || ""}
        onChangeText={(value) =>
          setAddress({ ...address, detailAddress: value })
        }
      />

      <TouchableOpacity
        onPress={toNextPage}
        className="justify-center px-2 py-4 rounded-md bg-primary-200"
      >
        <Text className="text-white text-center font-jregular">건물 선택</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  find_button: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  post_code: {
    flex: 1,
  },
  button_outline: {
    padding: 10.5,
    color: "#22c55e",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 5,
    textAlign: "center",
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
  next_button: {
    padding: 8,
    color: "#22c55e",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 5,
  },
  last_container: {
    marginTop: 10,
  },
});
