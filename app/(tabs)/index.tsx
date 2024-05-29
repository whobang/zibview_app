import { StyleSheet, View, FlatList, Alert } from "react-native";

import { POSTS } from "./dummies";
import React, { useEffect, useState } from "react";
import Post from "@/components/post/Post";
import { axios } from "@/api/axios";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAuth0 } from "react-native-auth0";
import { IPost } from "@/types/post/type";
import { AxiosResponse } from "axios";

export default function HomeScreen() {
  // state
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  // hooks
  const { user } = useAuth0();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (user) {
      handleLocation();
      fetchPosts(location);
    }
  }, []);

  useEffect(() => {
    fetchPosts(location);
  }, [location]);

  // 로그인한 사용자의 위치를 저장
  const handleLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    saveLocation(location);
    fetchPosts(location);
  };

  // 위치 정보를 서버에 저장
  const saveLocation = async (location: LocationObject) => {
    axiosPrivate
      .post("/api/locations", location)
      .then((res) => console.log("위치 저장 성공"))
      .catch((error) =>
        Alert.alert("위치 저장을 실패했습니다. 다시 시도해주세요.")
      );
  };

  // 포스트 목록 요청
  const fetchPosts = async (location: LocationObject | null) => {
    console.log("fetchPosts", location);
    try {
      const response = await axios.get<string, AxiosResponse<IPost[]>>(
        "/api/posts",
        {
          params: {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            maxDistance: 10000000, // 미국 기준
          },
        }
      );
      console.log("data", response);

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("posts", posts);

  // view
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.innerContainer}
        data={posts}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({ item }) => <Post post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: { width: "100%" },
});
