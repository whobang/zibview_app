import {
  Text,
  FlatList,
  Alert,
  View,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { axios } from "@/api/axios";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAuth0 } from "react-native-auth0";
import { IPost } from "@/types/post/type";
import { AxiosResponse } from "axios";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/post/Post";
import PlusButton from "@/components/PlusButton";

export default function HomeScreen() {
  // state
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // hooks
  const { user } = useAuth0();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {
    data: posts,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(location),
  });

  console.log("posts", posts);

  useEffect(() => {
    if (user) {
      handleLocation();
    }
  }, []);

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

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  // if (true) {
  //   // auth?.needOnboarding
  //   console.log("auth", auth);
  //   return <Redirect href="/onboarding" />;
  // }

  // view
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={() => (
          <View className="flex-row my-6 px-4 space-y-6 items-center justify-between">
            <SearchInput />
            <PlusButton />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
