import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
};

const UnderlineTextInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default UnderlineTextInput;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: "#9ca3af",
    height: 35,
    textAlign: "right",
    paddingRight: 5,
    marginRight: 5,
  },
});
