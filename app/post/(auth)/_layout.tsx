import useProtectRoute from "@/hooks/useProtectRoute";
import { Redirect, Slot } from "expo-router";
import React from "react";

const PostLayout = () => {
  const shouldLogin = useProtectRoute();

  if (shouldLogin) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default PostLayout;
