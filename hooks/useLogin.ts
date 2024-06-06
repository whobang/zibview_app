import { axios } from "@/api/axios";
import { useEffect } from "react";
import { Alert } from "react-native";
import { User, useAuth0 } from "react-native-auth0";
import useAuth from "./useAuth";
import { AxiosResponse } from "axios";

interface LoginResponse {
  givenName: string;
  familyName: string;
  needOnboarding: boolean;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  sub: string;
}

const useLogin = () => {
  const { user, authorize, getCredentials, error, clearSession } = useAuth0();
  const { setAuth } = useAuth();

  console.log(axios.defaults.baseURL);

  const login = async () => {
    try {
      await authorize(
        {
          scope: "openid profile email",
          audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
        },
        { ephemeralSession: true }
      );
    } catch (e) {
      console.log(e);
      Alert.alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const loginRequest = async () => {
    const credentials = await getCredentials();
    await axios
      .post<User | null, AxiosResponse<LoginResponse>>("/api/login", user, {
        headers: {
          Authorization: `Bearer ${credentials?.accessToken}`,
        },
      })
      .then((res) => {
        setAuth({
          accessToken: credentials!.accessToken,
          email: user?.email,
          name: user?.name,
          needOnboarding: res.data.needOnboarding,
        });
      })
      .catch((e) => {
        console.error("e", e.response.data);
        Alert.alert("로그인에 실패했습니다. 다시 시도해주세요.");
        logout();
      });
  };

  useEffect(() => {
    if (user) {
      loginRequest();
    }
  }, [user]);

  const logout = async () => {
    await clearSession();
  };

  return { login, logout };
};

export default useLogin;
