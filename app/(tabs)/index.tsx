import { StyleSheet, Text, View, FlatList } from "react-native";

import { POSTS } from "./dummies";
import React from "react";
import Post from "@/components/post/Post";

export default function HomeScreen() {
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
