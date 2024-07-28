import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Text from "@/components/Text";
import { AntDesign } from "@expo/vector-icons";
import IconWithCount from "@/components/common/IconWithCount";
import TextInput from "@/components/common/TextInput";
import { User } from "@/context/AuthProvider";
import Map from "@/components/Map";
import { BuildingType } from "@/types/post/type";
import { axios } from "@/api/axios";
import BuildingInfo from "@/app/post/components/BuildingInfo";
import { AxiosResponse } from "axios";
import EmptyState from "@/components/EmptyState";
import Content from "@/app/post/components/Content";
import BackButton from "@/components/BackButton";
import { useAuth0 } from "react-native-auth0";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface IPost {
  latitude: number;
  longitude: number;
  buildingName: string;
  address: string;
  buildingType: BuildingType;
  subPosts: SubPost[];
}

export interface SubPost {
  subPostId: number;
  createdAt: Date;
  title: string;
  description: string;
  imageUrls: string[];
  liked: boolean;
  likeCount: number;
  disliked: boolean;
  dislikeCount: number;
  commentCount: number;
  latestComment: Comment | null;
}

interface Comment {
  comment: string;
  createdAt: Date;
}

const Post = () => {
  // hooks
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { user } = useAuth0();
  const axiosPrivate = useAxiosPrivate();
  const [post, setPost] = useState<IPost>({} as IPost);

  const allAxios = user ? axiosPrivate : axios;

  if (!postId) {
    // TODO : 404 페이지로 이동
    return <Text>포스트를 찾을 수 없습니다.</Text>;
  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // 포스트 정보 가져오기
  const fetchPost = async () => {
    const data = await allAxios.get<string, AxiosResponse<IPost>>(
      `/api/posts/${postId}`
    );
    setPost(data.data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <TouchableOpacity
              className="border border-primary rounded-lg p-2"
              onPress={() =>
                router.replace(
                  `/post/create?postId=${postId}&address=${post.address}`
                )
              }
            >
              <Text textStyle="text-primary">글쓰기</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView nestedScrollEnabled>
          <Map
            address={post.address}
            latitude={post.latitude}
            longitude={post.longitude}
          />
          <BuildingInfo
            buildingName={post.buildingName}
            buildingType={post.buildingType}
            address={post.address}
          />
          {post.subPosts && post.subPosts.length > 0 ? (
            post.subPosts.map((subPost) => (
              <Content key={subPost.subPostId} subPost={subPost} />
            ))
          ) : (
            <EmptyState
              title="등록된 게시글이 없습니다."
              subtitle="첫 번째 게시글을 등록하세요."
              buttonTitle="게시글 작성"
              containerStyles="mb-6"
              href={`/post/create?postId=${postId}&address=${post.address}`}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

const Comment = () => {
  return (
    <View
      style={{
        marginTop: 15,
        justifyContent: "center",
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 13, marginRight: 3 }}>
          댓글 12개 더보기
        </Text>
      </View>
      <View style={{ flexDirection: "row", columnGap: 15 }}>
        <View
          style={{
            flex: 1,
            rowGap: 10,
            backgroundColor: "#e5e7eb",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>sarakim</Text>
            <Text style={{ fontSize: 12, color: "#6b7280" }}>
              2024년 1월 23일
            </Text>
          </View>
          <Text style={{ fontSize: 14 }}>
            3개월간 머물 예정이며, 더 많은 정보를 원하시면 문의주세요. 집 주인은
            친절하고, 깨끗한 집입니다. 부동산은 어디어디 부동산입니다.
          </Text>
          <View style={{ flexDirection: "row" }}>
            <IconWithCount
              icon={<AntDesign name="like2" size={18} color="black" />}
              count={10}
            />
            <IconWithCount
              icon={<AntDesign name="dislike2" size={18} color="black" />}
              count={10}
            />
          </View>
          <View>
            <Text style={{ color: "#3b82f6" }}>답글 10개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

type EmptyCommentProps = {
  auth: User | null;
};

const EmptyComment = ({ auth }: EmptyCommentProps) => {
  return (
    <View style={{ flexDirection: "row", columnGap: 15, margin: 15 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#e5e7eb",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>
            {auth ? auth.name : "익명123"}
          </Text>
        </View>
        <TextInput placeholder="댓글 남기기" />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },

  page: {
    alignItems: "flex-start",
  },
  profile_image: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  image: {
    width: "100%",
    minHeight: "100%",
  },
  emptyBox: {
    height: 300,
    flex: 1,
  },
});
