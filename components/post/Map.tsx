import React from "react";
import { StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

const Map = () => {
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
            : process.env.EXPO_PUBLIC_ANDROID_API_URL) + "/map",
      }}
    />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: 350,
  },
});
