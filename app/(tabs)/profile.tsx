import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { useAuth0 } from "react-native-auth0";
import CustomButton from "@/components/CustomButtom";
import { Link } from "expo-router";
import useLogin from "@/hooks/useLogin";

const Profile = () => {
  const { user } = useAuth0();
  const { login, logout } = useLogin();

  return (
    <SafeAreaView className="h-full">
      <View className=" px-4">
        <View className="flex-row justify-between items-center mt-10 mb-5">
          <Text className="text-4xl font-jregular">프로필</Text>
          {user && <Image source={icons.bell} className="h-6 w-6" />}
        </View>
        {user && (
          <>
            <View className="flex-row items-center mb-5">
              <Image
                source={{ uri: user.picture }}
                resizeMode="cover"
                className="h-16 w-16 rounded-full border border-stone-400"
              />
              <View className="ml-5">
                <Text className="text-xl font-jbold">{user.name}</Text>
                <Text className="text-gray-600">{user.email}</Text>
              </View>
            </View>
            <CustomButton
              title="로그아웃"
              onPress={logout}
              containerStyles="mb-5"
              textStyles="text-white"
            />
          </>
        )}
        {!user && (
          <>
            <Text className="text-gray-600 mb-10 text-lg">
              당신의 경험을 공유하려면 로그인하세요!
            </Text>
            <CustomButton
              title="로그인"
              onPress={login}
              containerStyles="mb-5"
              textStyles="text-white"
            />
            <Text className="text-gray-800">
              집뷰 계정이 없으신가요?{" "}
              <Link href="" className="underline font-medium">
                회원 가입
              </Link>
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
