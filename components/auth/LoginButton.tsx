import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";

const Login = () => {
  const { setAuth } = useAuth();
  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();

  useEffect(() => {
    if (!user) {
      return;
    }

    login();
  }, [user]);

  const onLogin = async () => {
    try {
      await authorize({
        scope: "openid profile email",
        audience: "http://localhost:8080",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async () => {
    const credentials = await getCredentials();

    await axios
      .post("http://localhost:8080/api/login", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials!.accessToken}`,
        },
      })
      .then((res) => {
        console.log("log in success");
        setAuth({ accessToken: credentials!.accessToken });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <Pressable onPress={loggedIn ? onLogout : onLogin}>
      {({ pressed }) => (
        <Text
          style={{
            padding: 6,
            borderWidth: 1,
            borderRadius: 10,
            marginRight: 15,
            opacity: pressed ? 0.5 : 1,
          }}
        >
          {loggedIn ? "로그아웃" : "로그인"}
        </Text>
      )}
    </Pressable>
  );
};

export default Login;
