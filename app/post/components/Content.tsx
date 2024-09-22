import { View, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import Text from "@/components/Text";
import React, { useState } from "react";
import { SubPost } from "@/app/post/[postId]";
import { format } from "date-fns";
import IconWithCount from "../../../components/common/IconWithCount";
import uuid from "react-native-uuid";
import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAuth0 } from "react-native-auth0";
import { router } from "expo-router";

type Props = {
  subPost: SubPost;
};

const Content = ({ subPost }: Props) => {
  // hooks
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth0();

  // state
  const [likeCount, setLikeCount] = useState(subPost.likeCount);
  const [dislikeCount, setDislikeCount] = useState(subPost.dislikeCount);
  const [liked, setLiked] = useState(subPost.liked);
  const [disliked, setDisliked] = useState(subPost.disliked);

  // 좋아요
  const handleLike = () => {
    if (!user) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    axiosPrivate
      .post(`/api/posts/sub-post/${subPost.subPostId}/like`)
      .then(({ data, status }) => {
        if (disliked) {
          setDisliked(false);
          setDislikeCount((prevState) => prevState - 1);
        }
        setLiked(true);
        setLikeCount((prevState) => prevState + 1);
      });
  };

  // 싫어요
  const handleDislike = () => {
    if (!user) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }
    axiosPrivate
      .post(`/api/posts/sub-post/${subPost.subPostId}/dislike`)
      .then(({ data, status }) => {
        if (liked) {
          setLiked(false);
          setLikeCount((prevState) => prevState - 1);
        }
        setDisliked(true);
        setDislikeCount((prevState) => prevState + 1);
      });
  };

  // 좋아요 또는 싫어요 취소
  const removeLike = () => {
    if (!user) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    if (!liked && !disliked) {
      Alert.alert("좋아요 또는 싫어요를 눌러주세요.");
      return;
    }

    axiosPrivate
      .delete(`/api/posts/sub-post/${subPost.subPostId}/removelike`)
      .then(({ data, status }) => {
        setLiked(false);
        if (liked) {
          setLiked(false);
          setLikeCount((prevState) => prevState - 1);
        }
        if (disliked) {
          setDisliked(false);
          setDislikeCount((prevState) => prevState - 1);
        }
      });
  };

  return (
    <View className="flex-1 w-auto m-4 border-b border-gray-200 pb-2">
      <View className="flex-row justify-between items-center ">
        <View className="border border-primary-200 bg-primary/80 p-1 rounded-lg">
          <Text textStyle="text-xm text-white">거주 인증</Text>
        </View>
        <View>
          <Text textStyle="text-gray-500">
            {format(subPost.createdAt, "yyyy년 MM월 dd일")}
          </Text>
        </View>
      </View>

      <FlatList
        style={{ marginVertical: 10 }}
        horizontal
        data={subPost.imageUrls}
        renderItem={({ item }) => (
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 3,
              marginRight: 5,
            }}
            source={{ uri: item }}
          />
        )}
        keyExtractor={(item) => uuid.v4().toString()}
      />

      <View className="mb-3">
        <Text textStyle="text-base font-bold">{subPost.title}</Text>
        <Text textStyle="leading-5">{subPost.description}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => (liked ? removeLike() : handleLike())}
          >
            <IconWithCount
              icon={<ThumbsUp color={liked ? "#FF9C01" : "#000"} size={20} />}
              count={likeCount}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (disliked ? removeLike() : handleDislike())}
          >
            <IconWithCount
              icon={
                <ThumbsDown color={disliked ? "#FF9C01" : "#000"} size={20} />
              }
              count={dislikeCount}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/post/(modal)/comment-modal")}
        >
          <View>
            <Text textStyle="text-blue-500 underline">
              댓글 {subPost.commentCount}개
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Content;
