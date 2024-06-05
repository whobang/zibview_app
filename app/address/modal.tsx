import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import { useRecoilState } from "recoil";
import { addressState } from "@/atom/addressState";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import { useRouter } from "expo-router";
import React from "react";

export default function ModalScreen() {
  const [address, setAddress] = useRecoilState(addressState);
  const router = useRouter();

  const onSelected = (response: OnCompleteParams) => {
    setAddress({ ...response, detailAddress: "" });
    router.navigate("/post/address");
  };

  return (
    <View style={styles.container}>
      <Postcode
        onError={(error) => alert(error)}
        style={{ width: "100%", height: "100%" }}
        jsOptions={{ animation: true }}
        onSelected={onSelected}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
