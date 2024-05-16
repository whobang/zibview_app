import { StyleSheet, Text, View, FlatList } from "react-native";

import { POSTS } from "./dummies";
import React from "react";
import Post from "@/components/post/Post";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.innerContainer}
        data={POSTS}
        keyExtractor={(post: { postId: string }) => post.postId}
        renderItem={({ item }) => <Post post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: { width: "100%" },
});

// import { StyleSheet, Image, ScrollView, FlatList } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// import { Text, View } from "@/components/Themed";
// import { Link } from "expo-router";
// import IconWithCount from "@/components/common/IconWithCount";
// import React from "react";
// import { POSTS } from "./dummies";

// export const Home = () => {
//   return (
//     <View>
//       <FlatList
//         data={POSTS}
//         keyExtractor={(post) => post.postId + ""}
//         renderItem={() => <Card />}
//       />
//     </View>
//   );
// };

// export default function HomeTab() {
//   return (
//     <View style={styles.container}>
//       <CardContainer>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 1 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 2 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 3 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 4 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 5 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 6 },
//           }}
//         >
//           <Card />
//         </Link>
//         <Link
//           href={{
//             pathname: "/post/[postId]",
//             params: { postId: 7 },
//           }}
//         >
//           <Card />
//         </Link>
//       </CardContainer>
//     </View>
//   );
// }

// function CardContainer({ children }: { children: React.ReactNode }) {
//   return (
//     <View style={styles.card_container}>
//       <ScrollView>{children}</ScrollView>
//     </View>
//   );
// }

// const Card = () => {
//   return (
//     <View style={styles.card}>
//       <Image
//         style={styles.image}
//         source={{
//           uri: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-908900502706966329/original/6ea37971-9948-4334-8c00-120c2fb013db.jpeg",
//         }}
//       />
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <Text style={styles.title}>Title</Text>
//         <Text style={styles.content} numberOfLines={3}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
//           magnam harum quidem sdfsdf
//         </Text>
//         <Text>성남시 수정구</Text>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             alignItems: "flex-end",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={styles.icon_container}>
//             <IconWithCount
//               icon={<AntDesign name="like2" size={18} color="black" />}
//               count={10}
//             />
//             <IconWithCount
//               icon={<AntDesign name="message1" size={18} color="black" />}
//               count={10}
//             />
//           </View>
//           <View>
//             <Text>2시간 전</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "red",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//   },
//   card_container: {
//     flex: 1,
//     backgroundColor: "black",
//     paddingHorizontal: 15,
//   },
//   card: {
//     flex: 1,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     columnGap: 20,
//     paddingVertical: 20,
//     borderBottomColor: "#e5e7eb",
//     borderBottomWidth: 1,
//   },
//   image: {
//     width: 130,
//     height: 130,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     paddingBottom: 5,
//   },
//   content: {
//     fontSize: 14,
//     paddingBottom: 10,
//   },
//   icon_container: {
//     flexDirection: "row",
//   },
// });
