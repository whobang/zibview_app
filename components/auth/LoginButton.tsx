import axios from "axios";
import React from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth0, Auth0Provider } from "react-native-auth0";

const Login = () => {
  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();

  console.log("user", user);

  const onLogin = async () => {
    try {
      await authorize({
        scope: "openid profile email",
        audience: "http://localhost:8080",
      });
      const credentials = await getCredentials();

      await axios.post("http://localhost:8080/api/v1/login", user, {
        headers: {
          Authorization: `Bearer ${credentials?.accessToken}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
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
