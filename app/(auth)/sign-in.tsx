import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButtom";
import { sub } from "date-fns";
import { Link } from "expo-router";
import { router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {
    control,
    formState: { errors },
  } = useForm({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    router.replace("/index");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            name="email"
            control={control}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            name="password"
            control={control}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            onPress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
