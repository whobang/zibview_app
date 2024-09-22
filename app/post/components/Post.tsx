import IconWithCount from "@/components/common/IconWithCount";
import { IPostListResponse } from "@/types/post/type";
import React, { memo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { router } from "expo-router";
import NoImage from "../../../components/NoImage";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";
import ImagePagination from "../../../components/ImagePagination";
import { Eye, MessageSquareMore, ThumbsUp } from "lucide-react-native";
import { timeForToday } from "@/utils/dateUtils";

type Props = {
  post: IPostListResponse;
};

const Post = ({ post }: Props) => {
  // hooks
  const [isSwiping, setIsSwiping] = useState(false);
  const scrollOffset = useSharedValue(0);

  const onPageScroll = (e: {
    nativeEvent: { position: number; offset: number };
  }) => {
    if (e.nativeEvent.offset === 0) return;
    setIsSwiping(true);
    scrollOffset.value = e.nativeEvent.position + e.nativeEvent.offset;
  };

  const navigate = () => {
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
      <Pressable onPress={navigate}>
        <View className="w-full h-60 relative justify-center items-center">
          {imageUrls && imageUrls.length > 0 ? (
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
          <Text className="font-bold text-sm">
            {post.sggName + " " + post.emdName}
          </Text>
          {(post.buildingName || post.sggBuildingName) && (
            <Text className="font-bold text-sm">
              {post.sggBuildingName || post.buildingName}
            </Text>
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
                count={post.viewCount}
              />
            </View>
            <View className="pr-5">
              <Text className="text-sm text-gray-500">
                {timeForToday(post.updatedAt)}
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
