import HomeButton from "@/components/HomeButton";
import useProtectRoute from "@/hooks/useProtectRoute";
import { Redirect, Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "@/components/Text";

const PostLayout = () => {
  const shouldLogin = useProtectRoute();

  if (shouldLogin) {
    return <Redirect href="/profile" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="address"
        options={{
          headerTitle: "",
          headerLeft: () => <HomeButton />,
        }}
      />

      <Stack.Screen
        name="create"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Text>Go back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default PostLayout;
