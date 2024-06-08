import React, { useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { WebView } from "react-native-webview";
import MapLoader from "../MapLoader";

type Props = {
  postId: string;
  latitude: number;
  longitude: number;
};

const KakaoMap = ({ latitude, longitude }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View className="w-full h-[350]">
      <WebView
        onLoadEnd={() => setIsLoading(false)}
        originWhitelist={[
          process.env.EXPO_PUBLIC_IOS_API_URL!,
          process.env.EXPO_PUBLIC_ANDROID_API_URL!,
        ]}
        javaScriptEnabled={true}
        source={{
          uri:
            (Platform.OS === "ios"
              ? process.env.EXPO_PUBLIC_IOS_API_URL
              : process.env.EXPO_PUBLIC_ANDROID_API_URL) +
            `/map?latitude=${latitude}&longitude=${longitude}`,
        }}
      />
      {isLoading && (
        <ActivityIndicator
          className="absolute bg-slate-200 w-full h-full"
          size="large"
          color="#FF9C01"
        />
      )}
    </View>
  );
};

export default KakaoMap;
