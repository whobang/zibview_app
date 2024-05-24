import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, ScrollView } from "react-native";
import ImageSelector from "@/components/post/ImageSelector";
import React from "react";
import BuildingSelector from "@/components/post/BuildingSelector";
import { addressState } from "@/atom/addressState";
import { useRecoilValue } from "recoil";
import Residency from "@/components/post/Residency";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import ContractSelector, {
  ContractPrice,
} from "@/components/post/ContractSelector";
import { BuildingType, IPost, Post, postSchema } from "@/types/post/type";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "@/utils/zodUtils";
import { UTCtoKST } from "@/utils/dateUtils";

/**
 * @description 게시글 작성 페이지
 */
const Create = () => {
  // hooks
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const address = useRecoilValue(addressState);
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...getDefaults(postSchema),
      ...{
        buildingType: "OFFICETEL",
        address: address,
        contractInfo: {
          contractStartDate: UTCtoKST(new Date()),
          contractEndDate: UTCtoKST(new Date()),
        },
      },
    },
  });

  console.log("getValues: ", getValues());

  console.log("errors: ", errors);

  // 이미지 변경 핸들러
  const imageHandler = useCallback((imageUuids: string[]) => {
    // setPost((prev) => {
    //   return { ...prev, imageUuids };
    // });
  }, []);

  // 임대차 계약 변경 핸들러
  const contractHandler = (contractPrice: ContractPrice) => {
    // setPost((prev) => {
    //   return { ...prev, contractPrice };
    // });
  };

  // 게시글 등록 API 호출
  const registerPost = async () => {
    console.log("registerPost: ", getValues());
    // TODO: Validation
    // await axiosPrivate
    //   .post<Post, AxiosResponse<IPost>>("/api/posts", post)
    //   .then(({ data }) => {
    //     router.replace(`/post/${data.postId}`);
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e);
    //   });
  };

  // view
  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>거주 기간</Text>
      <Residency
        name={[
          "contractInfo.contractStartDate",
          "contractInfo.contractEndDate",
        ]}
        control={control}
        contractStartDate={getValues().contractInfo.contractStartDate}
        contractEndDate={getValues().contractInfo.contractEndDate}
      />

      <Text style={styles.title}>건물 유형</Text>
      <BuildingSelector
        control={control}
        name="buildingType"
        defaultValue={getValues().buildingType}
      />

      <Text style={styles.title}>임대차 계약</Text>
      <ContractSelector onContractPriceChange={contractHandler} />

      <Text style={styles.title}>이미지</Text>
      <ImageSelector onImageChange={imageHandler} />

      <Text style={styles.title}>제목</Text>
      <FormField
        name="title"
        control={control}
        error={errors.title}
        helperText={errors.title?.message?.toString()}
      />

      <Text style={styles.title}>자세한 설명</Text>
      <FormField
        name="description"
        control={control}
        error={errors.description}
        helperText={errors.description?.message?.toString()}
        multiline
        placeholder="현재 집의 상태나 계약 진행 과정을 상세하게 적어주세요."
      />

      <Pressable onPress={handleSubmit(registerPost)}>
        {({ pressed }) => (
          <Text
            style={[
              styles.button,
              {
                backgroundColor: pressed ? "#fff" : "#22c55e",
                color: pressed ? "#22c55e" : "#fff",
              },
            ]}
          >
            등록
          </Text>
        )}
      </Pressable>
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
