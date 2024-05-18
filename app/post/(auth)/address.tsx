import { Pressable, View, StyleSheet, Text, Alert } from "react-native";
import { Link } from "expo-router";
import TextInput from "@/components/common/TextInput";
import { useRecoilState } from "recoil";
import { addressState } from "@/atom/addressState";
import { useRouter } from "expo-router";
import React from "react";

/**
 * @description 주소 검색 페이지
 */
const SearchAddress = () => {
  // state
  const [address, setAddress] = useRecoilState(addressState);

  // hooks
  const router = useRouter();

  const toNextPage = () => {
    if (!address.zonecode || !address.address) {
      Alert.alert("주소를 입력해주세요.");
      return;
    }
    router.push("/post/create");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주소</Text>
      <View style={styles.find_button}>
        <View style={styles.post_code}>
          <TextInput
            placeholder="우편번호"
            editable={false}
            value={address.zonecode ? address.zonecode.toString() : ""}
          />
        </View>
        <Link href="/address/modal" asChild>
          <Pressable>
            {({ pressed }) => (
              <Text
                style={[styles.button_outline, { opacity: pressed ? 0.5 : 1 }]}
              >
                우편번호 찾기
              </Text>
            )}
          </Pressable>
        </Link>
      </View>

      <TextInput
        placeholder="지번 주소"
        editable={false}
        value={address.jibunAddress || ""}
      />

      <TextInput
        placeholder="도로명 주소"
        editable={false}
        value={address.roadAddress || ""}
      />

      <TextInput
        placeholder="상세주소"
        value={address.detailAddress || ""}
        onChangeText={(value) =>
          setAddress({ ...address, detailAddress: value })
        }
      />

      <View style={styles.last_container}>
        <Pressable onPress={toNextPage}>
          {({ pressed }) => (
            <Text
              style={[
                styles.button,
                {
                  backgroundColor: pressed ? "#fff" : "#22c55e",
                  color: pressed ? "#22c55e" : "#fff",
                },
              ]}
            >
              건물 선택
            </Text>
          )}
        </Pressable>
      </View>
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
