import { View, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  imageUrls: string[];
  scrollOffset: any;
};

const ImagePagination = ({ imageUrls, scrollOffset }: Props) => {
  console.log("imageUrls", imageUrls);

  return (
    <View style={styles.pagination}>
      {imageUrls.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const opacity = interpolate(
            scrollOffset.value,
            [index - 1, index, index + 1],
            [0.3, 1, 0.3],
            Extrapolation.CLAMP
          );
          const scale = interpolate(
            scrollOffset.value,
            [index - 1, index, index + 1],
            [0.8, 1.2, 0.8],
            Extrapolation.CLAMP
          );
          return {
            opacity,
            transform: [{ scale }],
          };
        });

        return (
          <Animated.View key={index} style={[styles.dot, animatedStyle]} />
        );
      })}
    </View>
  );
};

export default ImagePagination;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
});
