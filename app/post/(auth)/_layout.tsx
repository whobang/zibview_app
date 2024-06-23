import HomeButton from "@/components/HomeButton";
import useProtectRoute from "@/hooks/useProtectRoute";
import { Redirect, Stack } from "expo-router";
import React from "react";

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
        }}
      />
    </Stack>
  );
};

export default PostLayout;
