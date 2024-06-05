import IconWithCount from "@/components/common/IconWithCount";
import { IPost } from "@/types/post/type";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { format } from "date-fns";

type Props = {
  post: IPost;
};

const Post = ({ post }: Props) => {
  const pressHandler = () => {
    router.navigate(`/post/${post.postId}`);
  };

  const imageUrl =
    Platform.OS === "ios"
      ? post.imageUrl
      : process.env.EXPO_PUBLIC_ANDROID_API_URL + post.imageUrn!;

  return (
    <Pressable onPress={pressHandler}>
      <View className="mx-4 mb-14">
        <View className="w-full h-60 relative justify-center items-center">
          <Image
            className="w-full h-full rounded-xl"
            resizeMode="cover"
            source={{
              uri: imageUrl || "",
            }}
          />
        </View>
        <View className="flex-1 gap-1 items-start py-2 px-1">
          <Text className="font-jregular text-2xl">{post.address}</Text>
          {post.buildingName && (
            <Text style={styles.buildingName}>{post.buildingName}</Text>
          )}
          <View style={styles.row}>
            <Text style={styles.rowItem} numberOfLines={1}>
              <Text className="text-lg font-jregular">월세:</Text>{" "}
              <Text className="font-pbold text-primary-100 text-xl">
                {post.monthlyRent.deposit}/{post.monthlyRent.monthlyFee}{" "}
              </Text>
              <Text className="text-gray-500">만원</Text>
            </Text>
            <Text style={styles.updatedAt}>
              기준일 {format(post.monthlyRent.lastUpdatedAt, "yyyy/MM/dd")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowItem} numberOfLines={1}>
              <Text className="text-lg font-jregular">전세:</Text>{" "}
              <Text className="font-pbold text-primary-100 text-xl">
                {post.depositRent.deposit}
              </Text>{" "}
              <Text className="text-gray-500">만원</Text>
            </Text>
            <Text style={styles.updatedAt}>
              기준일 {format(post.depositRent.lastUpdatedAt, "yyyy/MM/dd")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowItem} numberOfLines={1}>
              <Text className="text-lg font-jregular">반전세:</Text>{" "}
              <Text className="font-pbold text-primary-100 text-xl">
                {post.mixedRent.deposit}/{post.mixedRent.monthlyFee}
              </Text>{" "}
              <Text className="text-gray-500">만원</Text>
            </Text>
            <Text style={styles.updatedAt}>
              기준일 {format(post.mixedRent.lastUpdatedAt, "yyyy/MM/dd")}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <IconWithCount
              icon={<AntDesign name="like2" size={16} color="black" />}
              count={post.likeCount}
            />
            <IconWithCount
              icon={<AntDesign name="message1" size={16} color="black" />}
              count={post.commentCount}
            />
            <Text style={styles.rowItem}>
              <AntDesign name="staro" size={16} color="black" /> 5.0
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
    borderRadius: 10,
    backgroundColor: "white",
  },
  imageContainer: { flex: 1 },
  image: {
    height: 200,
    resizeMode: "cover",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    flex: 1,
    rowGap: 5,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18,
  },
  rowItem: {
    flex: 1,
  },
  updatedAt: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: "#6b7280",
    textAlign: "right",
  },
  // address: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
  buildingName: { fontSize: 14, fontWeight: "bold" },
  iconContainer: { flexDirection: "row", columnGap: 10, marginTop: 5 },
});
