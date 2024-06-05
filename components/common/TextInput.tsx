import React from "react";
import { useState } from "react";
import {
  TextInput as OriginalTextInput,
  Platform,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  placeholder?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  isValid?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  containerStyles?: string;
  textStyles?: string;
};

const TextInput = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  multiline,
  numberOfLines,
  containerStyles,
  textStyles,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View
      className={`border border-stone-400 rounded-lg px-2 h-12 justify-center ${containerStyles}`}
    >
      <OriginalTextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`text-black ${textStyles}`}
      />
    </View>
  );
};

export default TextInput;
