import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
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

const  HomeScreen = () => {
  // state
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // 포스트 목록 요청
  const fetchPosts = async () => {
    setLoading(true);
    const response = await axios.get<string, AxiosResponse<Page<IPost>>>(
      `/api/posts?page=${page}&size=10&sort=id,desc`
    );
  
    // console.log(JSON.stringify(response.data, null, 2));
    setPosts((prevState) => [...prevState, ...response.data.content]);
    setPage(response.data.pageable.pageNumber + 1);

    setLoading(false);
  };

  // hooks
  const { user } = useAuth0();
  const { auth } = useAuth();
  
  useEffect(() => {
    fetchPosts()
  }, [])

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   queryClient.invalidateQueries({ queryKey: ["posts"] })
  //   refetch({cancelRefetch: false});
  //   setRefreshing(false);
  // };

  // const onEndReached = () => {
  //   if (isLoading || !hasNextPage || isFetchingNextPage || isFetching) {
  //     return;
  //   }
  //   console.log("fetchNextPage");

  //   fetchNextPage();
  // };

  // TODO : onboarding
  // if (true) {
  //   // auth?.needOnboarding
  //   console.log("auth", auth);
  //   return <Redirect href="/onboarding" />;
  // }

  // view
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({item}) => (
          <Post post={item} />
        )}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={3}
        // debug={true}
        ListHeaderComponent={() => (
          <View className="flex-row my-6 px-4 space-y-6 items-center justify-between">
            <SearchInput />
            <PlusButton />
          </View>
        )}
        // ListEmptyComponent={() => (
        //   isLoading 
        //   ? (<PostLoader length={10} />) 
        //   : (<EmptyState
        //     title="No Videos Found"
        //     subtitle="Be the first one to upload a video"
        //     buttonTitle="Upload Video"
        //   />)
        // )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={() => (
          <View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            <Text onPress={fetchPosts} className="self-center text-xl text-blue-500">Load more</Text>
          </View>
        )}
      />
      
    </SafeAreaView>
  );
}

export default HomeScreen;