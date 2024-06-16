import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { WebView } from "react-native-webview";
import MapView, { Marker } from "react-native-maps";

type Props = {
  address: string;
  latitude: number;
  longitude: number;
};

const Map = ({ address, latitude, longitude }: Props) => {
  return (
    <View className="w-full h-[350]">
      {Platform.OS === "ios" ? (
        <IOS_MAP address={address} latitude={latitude} longitude={longitude} />
      ) : (
        <AndroidMap
          address={address}
          latitude={latitude}
          longitude={longitude}
        />
      )}
    </View>
  );
};

export default Map;

const IOS_MAP = ({ address, latitude, longitude }: Props) => {
  return (
    <MapView
      loadingEnabled
      loadingIndicatorColor="#FF9C01"
      className="w-full h-full"
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={address}
      />
    </MapView>
  );
};

const AndroidMap = ({ address, latitude, longitude }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoadEnd={() => setIsLoading(false)}
        originWhitelist={[process.env.EXPO_PUBLIC_ANDROID_API_URL!]}
        source={{
          uri:
            process.env.EXPO_PUBLIC_ANDROID_API_URL +
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
    </>
  );
};
