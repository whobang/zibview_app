import React from "react";
import { View, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";

const Login = () => {
  const { user, authorize } = useAuth0();

  // if (!user) {
  //   const login = async () => {
  //     try {
  //       await authorize({
  //         scope: "openid profile email",
  //         audience: "http://localhost:8080",
  //       });

  //       await axios.post("http://localhost:8080/api/login", user);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   login();
  //   return;
  // }

  return (
    <View>
      <Text>Login Page</Text>
    </View>
  );
};

export default Login;
