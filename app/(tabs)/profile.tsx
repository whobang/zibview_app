import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function ProfileTab() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const onLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error(error);
    } finally {
      setAuth(null);
      router.replace("/(tabs)/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <Text style={styles.title}>Tab Two</Text>

        {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
        <Pressable onPress={onLogout}>
          <Text>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_container: {
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
