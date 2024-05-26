import React from "react";
import { StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  postId: string;
};

const KakaoMap = ({ postId }: Props) => {
  return (
    <WebView
      style={styles.map}
      originWhitelist={[
        process.env.EXPO_PUBLIC_IOS_API_URL!,
        process.env.EXPO_PUBLIC_ANDROID_API_URL!,
      ]}
      javaScriptEnabled={true}
      source={{
        uri:
          (Platform.OS === "ios"
            ? process.env.EXPO_PUBLIC_IOS_API_URL
            : process.env.EXPO_PUBLIC_ANDROID_API_URL) + `/map/${postId}`,
      }}
    />
  );
};

export default KakaoMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: 350,
  },
});
