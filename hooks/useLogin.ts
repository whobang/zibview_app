import { axios } from "@/api/axios";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { useAuth0 } from "react-native-auth0";

const useLogin = () => {
  const { user, authorize, getCredentials, error, clearSession } = useAuth0();

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
    }
  };

  const loginRequest = async () => {
    const credentials = await getCredentials();
    await axios
      .post("/api/login", user, {
        headers: {
          Authorization: `Bearer ${credentials?.accessToken}`,
        },
      })
      .then((res) => console.log("res", res))
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
