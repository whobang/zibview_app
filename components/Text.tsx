import { Text as RNText, TextProps } from "react-native";
import React from "react";
import { styled } from "nativewind";

type Props = {
  children: React.ReactNode;
  textStyle?: string;
};

const Text = ({ children, textStyle }: Props) => {
  return <RNText className={`${textStyle}`}>{children}</RNText>;
};

export default Text;
