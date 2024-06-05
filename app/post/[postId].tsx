import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import PagerView from "react-native-pager-view";
import { AntDesign } from "@expo/vector-icons";
import IconWithCount from "@/components/common/IconWithCount";
import TextInput from "@/components/common/TextInput";
import useAuth from "@/hooks/useAuth";
import { User } from "@/context/AuthProvider";
import KakaoMap from "@/components/post/KakaoMap";
import { ChronoUnit } from "@/types/common/type";
import { BuildingType } from "@/types/post/type";
import { axios } from "@/api/axios";
import BuildingInfo from "@/components/post/BuildingInfo";

interface IPost {
  latitude: number;
  longitude: number;
  buildingName: string;
  address: string;
  buildingType: BuildingType;
  subPosts: SubPost[];
}

interface SubPost {
  userId: number;
  userName: string;
  profileImageUrl: string;
  residencePeriod: number;
  residencePeriodUnit: ChronoUnit;
  createdAt: Date;
  title: string;
  description: string;
  imageUrls: string[];
  commentCount: number;
  latestComment: Comment | null;
}

interface Comment {
  userId: number;
  userName: string;
  profileImageUrl: string;
  comment: string;
  createdAt: Date;
}

const Post = () => {
  // hooks
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { auth } = useAuth();
  const [post, setPost] = useState<IPost>({} as IPost);

  if (!postId) {
    // TODO : 404 페이지로 이동
    return <Text>포스트를 찾을 수 없습니다.</Text>;
  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // 포스트 정보 가져오기
  const fetchPost = async () => {
    const data = await axios.get<string, IPost>(`/api/posts/${postId}`);
    setPost(data);
    console.log("data", data);
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <KakaoMap postId={postId} />
        <BuildingInfo
          buildingName={post.buildingName}
          buildingType={post.buildingType}
          address={post.address}
        />
        <Content />
        <Content />
        <EmptyComment auth={auth} />
        <Content />
        <Content />
      </ScrollView>
    </View>
  );
};

const ImageSwiper = () => {
  return (
    <View style={styles.emptyBox}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            style={styles.image}
            source={{
              uri: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
            }}
          />
        </View>
        <View style={styles.page} key="2">
          <Image
            style={styles.image}
            source={{
              uri: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
            }}
          />
        </View>
      </PagerView>
    </View>
  );
};

const Content = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "auto",
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: "#eaeaea",
        borderBottomWidth: 1,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Image
          style={styles.profile_image}
          source={{
            uri: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
          }}
        />
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View
            style={{
              flexDirection: "row",
              columnGap: 5,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>sarakim</Text>
            <AntDesign name="checkcircleo" size={18} />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>거주 기간: 1년</Text>
            <Text style={{ marginBottom: 3, color: "#6b7280" }}>
              2024년 1월 23일
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{ marginVertical: 10 }}
        horizontal
        data={[
          {
            id: 1,
            url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
          },
          {
            id: 2,
            url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
          },
          {
            id: 3,
            url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
          },
        ]}
        renderItem={({ item }) => (
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 3,
              marginRight: 5,
            }}
            source={{ uri: item.url }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 12 }}>
        오늘 첫 입주했습니다.
      </Text>
      <Text style={{ fontSize: 16 }}>
        3개월간 머물 예정이며, 더 많은 정보를 원하시면 문의주세요. 집 주인은
        친절하고, 깨끗한 집입니다. 부동산은 어디어디 부동산입니다.
      </Text>
      <Comment />
    </View>
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
