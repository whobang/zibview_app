import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Button, Pressable, View, Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import useRefreshtoken from "@/hooks/useRefreshToken";

const HomeHeaderRight = () => {
  const colorScheme = useColorScheme();
  const { auth } = useAuth();
  const refresh = useRefreshtoken();

  return (
    <View style={{ flexDirection: "row" }}>
      <Button title="refresh" onPress={refresh} />
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
      {!auth && (
        <Link href="/login" asChild>
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
                로그인
              </Text>
            )}
          </Pressable>
        </Link>
      )}
      <Link href="/modal" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="info-circle"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
};

export default HomeHeaderRight;
