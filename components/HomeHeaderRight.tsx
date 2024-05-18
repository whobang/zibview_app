import { Link } from "expo-router";
import React from "react";
import { Pressable, View, Text } from "react-native";
import LoginButton from "./auth/LoginButton";

const HomeHeaderRight = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Link href="/post/(register)/address" asChild>
        <Pressable>
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
              글쓰기
            </Text>
          )}
        </Pressable>
      </Link>
      <LoginButton />
    </View>
  );
};

export default HomeHeaderRight;
