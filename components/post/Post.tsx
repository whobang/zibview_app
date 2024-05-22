import IconWithCount from "@/components/common/IconWithCount";
import { IPost } from "@/types/post/type";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

type Props = {
  post: IPost;
};

const Post = ({ post }: Props) => {
  const pressHandler = () => {
    router.navigate(`/post/${post.postId}`);
  };

  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: post.url,
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.address}>{post.address}</Text>
          <Text style={styles.buildingName}>{post.buildingName}</Text>
          <View style={styles.row}>
            <Text style={styles.rowItem}>월세: 1000/50만원</Text>
            <Text style={styles.updatedAt}>기준일 2024/01/12</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowItem}>전세: 5000만원</Text>
            <Text style={styles.updatedAt}>기준일 2024/01/12</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowItem}>반전세: 5000만원</Text>
            <Text style={styles.updatedAt}>기준일 2024/01/12</Text>
          </View>

          <View style={styles.iconContainer}>
            <IconWithCount
              icon={<AntDesign name="like2" size={16} color="black" />}
              count={post.likeCount}
            />
            <IconWithCount
              icon={<AntDesign name="message1" size={16} color="black" />}
              count={post.chatCount}
            />
            <Text style={styles.rowItem}>
              별점: <AntDesign name="staro" size={14} color="black" />
              <AntDesign name="staro" size={14} color="black" />
              <AntDesign name="staro" size={14} color="black" />
              <AntDesign name="staro" size={14} color="black" />
              <AntDesign name="staro" size={14} color="black" />
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    height: 150,
    columnGap: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
  },
  imageContainer: { flex: 1 },
  image: {
    resizeMode: "cover",
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  details: {
    flex: 2,
    rowGap: 5,
    paddingLeft: 5,
  },
  row: {
    flexDirection: "row",
    columnGap: 18,
  },
  rowItem: {
    flex: 1,
  },
  updatedAt: {
    fontSize: 11,
    textDecorationLine: "underline",
    color: "#6b7280",
    textAlign: "right",
  },
  address: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
  buildingName: { fontSize: 14, fontWeight: "bold" },
  iconContainer: { flexDirection: "row", columnGap: 10 },
});
