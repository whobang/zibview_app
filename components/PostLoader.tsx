import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

type Props = {
  length: number
}

const PostLoader = ({length}: Props) => {
  return (
    <View className="justify-center items-center px-4">
      {Array.from({length: length}, (_, i) => (
        <ContentLoader
        key={i} 
        speed={2}
        width="100%"
        height={460}
        viewBox="0 0 500 250"
        backgroundColor="#c9c9c9"
        foregroundColor="#bdbdbd"
      >
        <Rect x="0" y="0" rx="2" ry="2" width="100%" height="250" />
        <Rect x="0" y="260" rx="2" ry="2" width="80%" height="15" />
      </ContentLoader>
      ))}
      
  </View>
  );
};

export default PostLoader;
