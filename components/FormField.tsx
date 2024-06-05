import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import { icons } from "@/constants";

type Props<T extends FieldValues> = {
  title: string;
  placeholder?: string;
  name: Path<T>;
  error?: FieldError;
  helperText?: string;
  control: Control<T, any>;
  multiline?: boolean;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
};

const FormField = <T extends FieldValues>({
  title,
  placeholder,
  name,
  error,
  helperText,
  control,
  multiline,
  otherStyles,
  keyboardType,
}: Props<T>) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row
        ${error ? "border-red-500" : ""}`}
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                className={`flex-1 text-white font-psemibold text-base ${
                  multiline ? "h-36" : ""
                }`}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onBlur={() => {
                  setFocused(false);
                  onBlur();
                }}
                multiline={multiline}
                onFocus={() => setFocused(true)}
                onChangeText={onChange}
                keyboardType={keyboardType}
                // secureTextEntry={title === "Password" && !showPassword}
              />

              {title === "Password" && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>
      {error && (
        <Text className={`${error ? "text-red-500" : ""}`}>
          {error.message || helperText}
        </Text>
      )}
    </View>
  );
};

export default FormField;
