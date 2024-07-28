import HomeButton from "@/components/HomeButton";
import useProtectRoute from "@/hooks/useProtectRoute";
import { Redirect, Stack, router } from "expo-router";
import React from "react";
import BackButton from "@/components/BackButton";

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
          headerLeft: () => (<BackButton />),
        }}
      />
    </Stack>
  );
};

export default PostLayout;
