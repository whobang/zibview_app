import React from "react";
import "expo-dev-client";
import { Tabs } from "expo-router";
import HomeHeaderRight from "@/components/HomeHeaderRight";
import { icons } from "@/constants";
import { Text, Image, ImageSourcePropType, View } from "react-native";

type TabBarIconProps = {
  icon: ImageSourcePropType | undefined;
  name: string;
  color: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabBarIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
          headerShown: false,
          // headerRight: () => <HomeHeaderRight />,
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "북마크",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          ),
          headerShown: false,
          headerRight: () => <HomeHeaderRight />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "메시지",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.message}
              color={color}
              name="Message"
              focused={focused}
            />
          ),
          headerShown: false,
          headerRight: () => <HomeHeaderRight />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
          headerShown: false,
          headerRight: () => <HomeHeaderRight />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
