import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { TextInput, Text, StyleSheet } from "react-native";

type Props<T extends FieldValues> = {
  placeholder?: string;
  name: Path<T>;
  error?: FieldError;
  helperText?: string;
  control: Control<T, any>;
  multiline?: boolean;
};

const FormField = <T extends FieldValues>({
  placeholder,
  name,
  error,
  helperText,
  control,
  multiline,
}: Props<T>) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
            multiline={multiline}
            onFocus={() => setFocused(true)}
            onChangeText={onChange}
            value={value}
            style={[
              styles.input,
              focused && styles.focused,
              error && styles.error,
              multiline && styles.multiline,
            ]}
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message || helperText}</Text>}
    </>
  );
};

export default FormField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 10,
    marginBottom: 5,
    color: "#000",
  },
  focused: {
    borderColor: Colors.primary,
  },
  error: {
    borderColor: "red",
    color: "red",
  },
  multiline: {
    height: 150,
  },
});
