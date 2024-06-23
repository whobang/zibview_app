import {
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import ImageSelector from "@/components/post/ImageSelector";
import React from "react";
import Residency from "@/components/post/Residency";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosResponse } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { IPost, Post, postSchema } from "@/types/post/type";
import { useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UTCtoKST } from "@/utils/dateUtils";
import CustomButton from "@/components/CustomButtom";

/**
 * @description 게시글 작성 페이지
 */
const Create = () => {
  // hooks
  const {postId, address} = useLocalSearchParams<{ postId: string, address: string }>();
  console.log("postId: ", postId, "address: ", address)
  const axiosPrivate = useAxiosPrivate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      contractInfo: {
        contractStartDate: UTCtoKST(new Date()),
        contractEndDate: UTCtoKST(new Date()),
      },
    },
  });

  // 게시글 등록 API 호출
  const registerPost = async () => {
    await axiosPrivate
      .post<Post, AxiosResponse<{subPostId : {subPostId: number}}>>("/api/posts/sub-post", {
        postId: postId,
        ...getValues()
      })
      .then(({ data, status }) => {
        router.replace(`/post/${postId}`);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  // view
  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-jregular mb-4" numberOfLines={1}>주소 : {address}</Text>

      <Text className="text-2xl font-jregular">거주 기간</Text>
      <Residency
        name={[
          "contractInfo.contractStartDate",
          "contractInfo.contractEndDate",
        ]}
        control={control}
        contractStartDate={getValues().contractInfo.contractStartDate}
        contractEndDate={getValues().contractInfo.contractEndDate}
      />

      <Text className="text-2xl font-jregular mt-4">이미지</Text>
      <ImageSelector control={control} name="imageUuids" />

      <FormField
        title="제목"
        name="title"
        control={control}
        error={errors.title}
        placeholder="제목을 적어주세요."
        helperText={errors.title?.message?.toString()}
        otherStyles="my-4"
      />

      <FormField
        title="자세한 설명"
        name="description"
        control={control}
        error={errors.description}
        helperText={errors.description?.message?.toString()}
        multiline
        placeholder="현재 집의 상태나 계약 진행 과정을 상세하게 적어주세요."
        otherStyles="mb-4"
      />

      <CustomButton title="등록" onPress={handleSubmit(registerPost)} />
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: 59,
    height: 59,
    borderRadius: 10,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  button: {
    padding: 12,
    backgroundColor: "#22c55e",
    borderWidth: 1,
    borderColor: "#22c55e",
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
    borderRadius: 5,
    textAlign: "center",
  },
});
