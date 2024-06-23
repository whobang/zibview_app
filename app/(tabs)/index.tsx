import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, {  useEffect, useState } from "react";
import { axios } from "@/api/axios";
import { useAuth0 } from "react-native-auth0";
import { IPost } from "@/types/post/type";
import { AxiosResponse } from "axios";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import Post from "@/components/post/Post";
import PlusButton from "@/components/PlusButton";
import { Page } from "@/types/common/type";
import NoImage from "@/components/NoImage";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const  HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  // 포스트 목록 요청
  const fetchPosts = async (pageParam: number) => {
    const response = await axios.get<string, AxiosResponse<Page<IPost>>>(
      `/api/posts?page=${pageParam}&size=10&sort=id,desc`
    );
    return response.data;
  };

  // hooks
  const { user } = useAuth0();
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const {data, refetch, error, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({pageParam}) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined,
  })

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ["posts"] })
    refetch({cancelRefetch: false});
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (isLoading || !hasNextPage || isFetchingNextPage || isFetching) {
      return;
    }
    console.log("fetchNextPage");

    fetchNextPage();
  };

  // TODO : onboarding
  // if (true) {
  //   // auth?.needOnboarding
  //   console.log("auth", auth);
  //   return <Redirect href="/onboarding" />;
  // }

  const posts = data?.pages.flatMap((page) => page.content) || [];

  // view
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({item}) => <Post post={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={3}
        ListHeaderComponent={() => (
          <View className="flex-row my-6 px-4 space-y-6 items-center justify-between">
            <SearchInput />
            <PlusButton />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={() => (isLoading || isFetchingNextPage) && <ActivityIndicator size="large" color="#FF9C01" />}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;