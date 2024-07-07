import IconWithCount from "@/components/common/IconWithCount";
import { IPost } from "@/types/post/type";
import { AntDesign } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import NoImage from "../NoImage";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";
import ImagePagination from "../ImagePagination";
import { Eye, MessageSquareMore, ThumbsUp } from "lucide-react-native";

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
                      // lazy load

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
          <View className="flex-row justify-between items-center w-full">
            <View style={styles.iconContainer}>
              <IconWithCount
                icon={<ThumbsUp color="#FF9C01" size={18} />}
                count={post.likeCount}
              />
              <IconWithCount
                icon={<MessageSquareMore color="#FF9C01" size={19} />}
                count={post.commentCount}
              />
              <IconWithCount
                icon={<Eye color="#FF9C01" size={20} />}
                count={post.commentCount}
              />
            </View>
            <View className="pr-5">
              <Text className="font-jregular text-sm text-gray-500">
                3시간 전
              </Text>
            </View>
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
