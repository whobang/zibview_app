import {
  addressSchema,
  contractInfoSchema,
  postSchema,
} from "@/types/post/type";
import { expect, test } from "@jest/globals";
import { z } from "zod";

test("ContractInfoSchema safeParse success", () => {
  const safe = contractInfoSchema.safeParse({
    residencyEndDate: new Date("2024-05-22T23:01:43.296Z"),
    residencyStartDate: new Date("2024-05-22T23:01:43.296Z"),
  });

  console.log("safe: ", safe);
  expect(safe.success).toEqual(true);
});

test("ContractInfoSchema safeParse fails", () => {
  const safe = contractInfoSchema.safeParse({
    residencyEndDate: "2024-05-22T23:01:43.296Z",
    residencyStartDate: "2024-05-22T23:01:43.296Z",
  });

  console.log("safe: ", safe);
  expect(safe.success).toEqual(false);
  expect(safe.error).toBeInstanceOf(z.ZodError);
});

test("AddressSchema safeParse success", () => {
  const safe = addressSchema.safeParse({
    address: "서울 서초구 강남대로 27",
    addressEnglish: "27, Gangnam-daero, Seocho-gu, Seoul, Korea",
    addressType: "R",
    apartment: "N",
    autoJibunAddress: "",
    autoJibunAddressEnglish: "",
    autoRoadAddress: "",
    autoRoadAddressEnglish: "",
    bcode: "1165010200",
    bname: "양재동",
    bname1: "",
    bname1English: "",
    bname2: "양재동",
    bname2English: "Yangjae-dong",
    bnameEnglish: "Yangjae-dong",
    buildingCode: "1165010200102320000000001",
    buildingName: "AT센터",
    detailAddress: "",
    hname: "",
    jibunAddress: "서울 서초구 양재동 232",
    jibunAddressEnglish: "232, Yangjae-dong, Seocho-gu, Seoul, Korea",
    noSelected: "N",
    postcode: "",
    postcode1: "",
    postcode2: "",
    postcodeSeq: "",
    query: "서초",
    roadAddress: "서울 서초구 강남대로 27",
    roadAddressEnglish: "27, Gangnam-daero, Seocho-gu, Seoul, Korea",
    roadname: "강남대로",
    roadnameCode: "2102001",
    roadnameEnglish: "Gangnam-daero",
    sido: "서울",
    sidoEnglish: "Seoul",
    sigungu: "서초구",
    sigunguCode: "11650",
    sigunguEnglish: "Seocho-gu",
    userLanguageType: "K",
    userSelectedType: "R",
    zonecode: "06774",
  });

  console.log("safe.error: ", safe.error);
  expect(safe.success).toEqual(true);
});

test("PostSchema safeParse fails", () => {
  const safe = postSchema.safeParse({
    title: "제목",
    description: "설명",
    address: {
      address: "서울 서초구 강남대로 27",
      addressEnglish: "27, Gangnam-daero, Seocho-gu, Seoul, Korea",
      addressType: "R",
      apartment: "N",
      autoJibunAddress: "",
      autoJibunAddressEnglish: "",
      autoRoadAddress: "",
      autoRoadAddressEnglish: "",
      bcode: "1165010200",
      bname: "양재동",
      bname1: "",
      bname1English: "",
      bname2: "양재동",
      bname2English: "Yangjae-dong",
      bnameEnglish: "Yangjae-dong",
      buildingCode: "1165010200102320000000001",
      buildingName: "AT센터",
      detailAddress: "",
      hname: "",
      jibunAddress: "서울 서초구 양재동 232",
      jibunAddressEnglish: "232, Yangjae-dong, Seocho-gu, Seoul, Korea",
      noSelected: "N",
      postcode: "",
      postcode1: "",
      postcode2: "",
      postcodeSeq: "",
      query: "서초",
      roadAddress: "서울 서초구 강남대로 27",
      roadAddressEnglish: "27, Gangnam-daero, Seocho-gu, Seoul, Korea",
      roadname: "강남대로",
      roadnameCode: "2102001",
      roadnameEnglish: "Gangnam-daero",
      sido: "서울",
      sidoEnglish: "Seoul",
      sigungu: "서초구",
      sigunguCode: "11650",
      sigunguEnglish: "Seocho-gu",
      userLanguageType: "K",
      userSelectedType: "R",
      zonecode: "06774",
    },
    buildingType: "OFFICETEL",
    contractInfo: {
      residencyEndDate: new Date("2024-05-23T03:44:22.176Z"),
      residencyStartDate: new Date("2024-05-23T03:44:22.176Z"),
    },
  });

  console.log("safe.error: ", safe.error);
  expect(safe.success).toEqual(true);
});
