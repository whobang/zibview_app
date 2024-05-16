import React from "react";
import { useState } from "react";
import { TextInput as OriginalTextInput, StyleSheet, View } from "react-native";

type Props = {
  placeholder?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  isValid?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
};

const TextInput = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  multiline,
  numberOfLines,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.input_container}>
      <OriginalTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            borderColor: focused ? "#2563EB" : "#9ca3af",
            height: multiline ? 150 : 40,
          },
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input_container: {
    alignItems: "center",
    columnGap: 10,
  },
  input: {
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
