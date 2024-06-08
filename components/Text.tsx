import { Text as RNText, TextProps } from "react-native";
import React from "react";
import { styled } from "nativewind";

type Props = {
  children: React.ReactNode;
  textStyle?: TextProps["style"];
};

const Text = ({ children, textStyle }: Props) => {
  return (
    <RNText className="font-jregular" style={textStyle}>
      {children}
    </RNText>
  );
};

export default styled(Text, {
  props: {
    textStyle: true,
  },
});
