import IconWithCount from "@/components/common/IconWithCount";
import { IPost } from "@/types/post/type";
import { AntDesign } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { router } from "expo-router";
import NoImage from "../NoImage";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";
import ImagePagination from "../ImagePagination";

type Props = {
  post: IPost;
};

const Post = ({ post }: Props) => {
  // hooks
  const [isSwiping, setIsSwiping] = useState(false);
  const scrollOffset = useSharedValue(0);

  const onPageScroll = (e: {
    nativeEvent: { position: number; offset: number };
  }) => {
    setIsSwiping(true);
    scrollOffset.value = e.nativeEvent.position + e.nativeEvent.offset;
  };

  const pressHandler = () => {
    if (isSwiping) return;
    router.push(`/post/${post.postId}`);
  };

  const baseUrl = Platform.select({
    ios: "",
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
  });

  const imageUrls =
    Platform.OS === "ios"
      ? post.imageUrl
      : post.imageUrn.map((urn) => `${baseUrl}${urn}`);

  return (
    <View className="mx-4 mb-8">
      <Pressable onPress={pressHandler}>
        <View className="w-full h-60 relative justify-center items-center">
          {imageUrls.length > 0 ? (
            <>
              <PagerView
                className="w-full h-full rounded-xl"
                initialPage={0}
                scrollEnabled
                onPageScroll={onPageScroll}
                onPageScrollStateChanged={() => setIsSwiping(false)}
                onPageSelected={() => setIsSwiping(false)}
              >
                {imageUrls.map((url, index) => (
                  <View key={index}>
                    <Image
                      className="w-full h-full rounded-xl"
                      resizeMode="cover"
                      source={{
                        uri: url,
                      }}
                    />
                  </View>
                ))}
              </PagerView>
              <ImagePagination
                imageUrls={imageUrls}
                scrollOffset={scrollOffset}
              />
            </>
          ) : (
            <NoImage />
          )}
        </View>
        <View className="gap-1 items-start py-2 px-1">
          <Text className="font-jregular text-2xl">{post.address}</Text>
          {post.buildingName && (
            <Text className="font-jregular text-lg">{post.buildingName}</Text>
          )}
          <View style={styles.iconContainer}>
            <IconWithCount
              icon={<AntDesign name="like2" size={16} color="black" />}
              count={post.likeCount}
            />
            <IconWithCount
              icon={<AntDesign name="message1" size={16} color="black" />}
              count={post.commentCount}
            />
            <Text className="flex-1">
              <AntDesign name="staro" size={16} color="black" /> 5.0
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(
  Post,
  (prevProps, nextProps) => prevProps.post.postId === nextProps.post.postId
);

const styles = StyleSheet.create({
  buildingName: { fontSize: 14, fontWeight: "bold" },
  iconContainer: { flexDirection: "row", columnGap: 10, marginTop: 5 },
});
