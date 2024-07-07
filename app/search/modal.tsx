import { View, Image, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import Text from "@/components/Text";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/api/axios";
import { AxiosResponse } from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MapPin } from "lucide-react-native";

interface IPost {
  postId: number;
  address: string;
  buildingName: string;
}

const SearchModal = () => {
  const [query, setQuery] = useState("");

  const { data } = useQuery({
    initialData: [],
    queryKey: ["search", query],
    queryFn: () => searchAsYouType(query),
  });

  const searchAsYouType = async (query: string) => {
    try {
      const response: AxiosResponse<IPost[]> = await axios.get(
        `/api/posts/search-as-you-type?query=${query}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch data");
    }
  };

  return (
    <View className="mt-4 mx-5">
      <View className="flex-row items-center space-x-4 h-14 px-4 mb-4 rounded-full shadow-md border bg-white border-primary">
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
        <TextInput
          className="text-base"
          value={query}
          placeholder="주소 또는 건물명으로 검색"
          placeholderTextColor={"#9CA3AF"}
          onChangeText={(e) => setQuery(e)}
        />
      </View>
      <ScrollView>
        {data.map((post) => (
          <TouchableOpacity
            key={post.postId}
            className="h-16 border-b-gray-500"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-300/70 rounded-lg mr-4 justify-center items-center">
                <MapPin color="#FF9C01" />
              </View>
              <View>
                <Text textStyle="text-base text-gray-700">{post.address}</Text>
                <Text textStyle="text-sm text-gray-600 font-pregular">
                  {post.buildingName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchModal;
