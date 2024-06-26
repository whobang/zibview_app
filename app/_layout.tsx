import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import React from "react";
import { AuthProvider } from "@/context/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Auth0Provider } from "react-native-auth0";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!}
      >
        <RecoilRoot>
          <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="post/(auth)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="post/[postId]"
                  options={{
                    headerShown: false,
                    headerTitle: "",
                  }}
                />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="address/modal"
                  options={{ presentation: "modal" }}
                />
              </Stack>
            </GestureHandlerRootView>
          </AuthProvider>
        </RecoilRoot>
      </Auth0Provider>
    </QueryClientProvider>
  );
}
