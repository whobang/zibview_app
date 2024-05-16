import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { axios } from "@/api/axios";

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  needOnboarding: boolean;
  email: string;
  pictureUrl: string;
  name: string;
  lastName: string;
  firstName: string;
}

const Login = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  useEffect(() => {
    googleConfigureSignIn();
  }, []);

  const googleConfigureSignIn = () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });
  };

  // Somewhere in your code
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo) {
        alert("로그인에 실패했습니다.");
        return;
      }

      console.log(userInfo);
      const { accessToken, refreshToken, expiresIn, needOnboarding } =
        await axios.post<User, LoginResponse>("/api/v1/login/google", userInfo);

      const { email, name, givenName, familyName, photo } = userInfo.user;
      setAuth({
        email: email,
        name: name,
        firstName: familyName,
        lastName: givenName,
        pictureUrl: photo,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
        needOnboarding: needOnboarding,
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available");
      } else {
        // some other error happened
        console.log(error);
        console.log("some other error happened");
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </View>
  );
};

export default Login;
