import useProtectRoute from "@/hooks/useProtectRoute";
import { Redirect, Slot } from "expo-router";
import React from "react";

const PostLayout = () => {
  const shouldLogin = useProtectRoute();

  if (shouldLogin) {
    return <Redirect href="/auth/login" />;
  }

  return <Slot />;
};

export default PostLayout;
