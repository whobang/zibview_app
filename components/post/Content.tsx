import { View, FlatList, Image } from "react-native";
import Text from "@/components/Text";
import React from "react";
import { SubPost } from "@/app/post/[postId]";
import { format } from "date-fns";
import IconWithCount from "../common/IconWithCount";
import { AntDesign } from "@expo/vector-icons";
import uuid from 'react-native-uuid';

type Props = {
  subPost: SubPost;
}

const Content = ({subPost}: Props) => {
  return (
    <View className="flex-1 w-auto m-4 border-b border-gray-200 pb-2">
      <View className="flex-row justify-between items-center ">
        <View className="border border-primary-200 bg-primary/80 p-1 rounded-lg"><Text textStyle="text-xm text-white">거주 인증</Text></View>        
        <View>
          <Text textStyle="text-gray-500">{format(subPost.createdAt, "yyyy년 MM월 dd일")}</Text>
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
        <Text textStyle="text-lg">
          {subPost.title}
        </Text>
        <Text textStyle="leading-5">
          {subPost.description}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
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
          <Text textStyle="text-blue-500 underline">답글 10개</Text>
        </View>
      </View>
    </View>
  );
};

export default Content;
