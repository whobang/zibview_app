import { StyleSheet, Text, View, FlatList } from "react-native";

import { POSTS } from "./dummies";
import React, { useEffect } from "react";
import Post from "@/components/post/Post";
import useAxios from "@/hooks/useAxios";

export default function HomeScreen() {
  // hooks
  const axios = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.innerContainer}
        data={POSTS}
        keyExtractor={(post: { postId: string }) => post.postId}
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
