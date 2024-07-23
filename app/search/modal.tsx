import { View, Image, TextInput, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { icons } from "@/constants";
import Text from "@/components/Text";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/api/axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MapPin } from "lucide-react-native";
import { router } from "expo-router";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

interface IPost {
  id: number;
  address: string;
  buildingName: string;
}

interface IAddressDocument {
    postId: number;
    roadNameAddress: string;
    jibunAddress: string;
    buildingName: string;
    sigunguBuildingName: string;
}

const SearchModal = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { data } = useQuery({
    initialData: [],
    queryKey: ["search", debouncedQuery],    
    queryFn: () => searchAsYouType(query),
    enabled: !!debouncedQuery, // Ensure query is not run with an empty string    
  });

  const searchAsYouType = useCallback(async (query: string) => {
    try {
      const response: AxiosResponse<IAddressDocument[]> = await axios.get(
        `/api/es/match-phrase-prefix?query=${query}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch data");
    }
  }, []);

  // Effect to handle debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300 milliseconds delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  const { width } = useWindowDimensions();

  // Memoize the data to avoid unnecessary re-renders
  const searchData = useMemo(() => data, [data]);

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
        {searchData.map((post) => (
          <TouchableOpacity
            key={post.postId}
            onPress={() => router.replace(`/post/${post.postId}`)}
            className="h-16 border-b-gray-500"
          >
            <View className="flex-row items-center w-full">
              <View className="w-12 h-12 bg-gray-300/70 rounded-lg mr-2 justify-center items-center">
                <MapPin color="#FF9C01" />
              </View>
              <View className="flex-1">
                <RenderHtml
                  contentWidth={width}
                  source={{ html: post.roadNameAddress }}
                />
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
