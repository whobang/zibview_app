import { useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

import { icons } from "../constants";
import React from "react";
import Text from "./Text";

type Props = {
  initialQuery?: string;
};

const SearchInput = ({ initialQuery }: Props) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <TouchableOpacity
      className="w-5/6"
      onPress={() => router.push("/search/modal")}
    >
      <View className="flex-row items-center space-x-4 h-14 px-4 rounded-full shadow-md border bg-white border-primary">
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
        <Text textStyle="text-base mt-0.5 flex-1 font-pregular text-gray-500 pl-2">
          주소 또는 건물명으로 검색
        </Text>

        {/* <TextInput
        className="text-base mt-0.5 flex-1 font-pregular"
        value={query}
        placeholder="주소 또는 건물명으로 검색"
        placeholderTextColor={"#9CA3AF"}
        onChangeText={(e) => setQuery(e)}
      /> */}

        {/* <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      ></TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
