import { z } from "zod";
export interface IPost {
  postId: string;
  url: string;
  address: string;
  buildingName: string;
  lastUpdatedAt: string;
  chatCount: number;
  likeCount: number;
  lastUpdatedBy: string;
}

export const ContractPriceSchema = z.object({
  deposit: z.number(),
  monthlyRent: z.number(),
  maintenanceFee: z.number(),
  contractPeriod: z.number(),
});

export const ContractInfoSchema = ContractPriceSchema.extend({
  residencyStartDate: z.date(),
  residencyEndDate: z.date(),
});

export const PostSchema = ContractInfoSchema.extend({
  buildingType: z.union([
    z.literal("APARTMENT"),
    z.literal("OFFICETEL"),
    z.literal("HOUSE"),
    z.literal("VILLA"),
  ]),
  title: z.string({ required_error: "제목을 입력해주세요." }),
  description: z.string({ required_error: "설명을 입력해주세요." }),
  address: z.object({
    zonecode: z.number(),
    address: z.string(),
    addressEnglish: z.string(),
    addressType: z.enum(["R", "J"]),
    userSelectedType: z.enum(["R", "J"]),
    noSelected: z.enum(["Y", "N"]),
    userLanguageType: z.enum(["K", "E"]),
    roadAddress: z.string(),
    roadAddressEnglish: z.string(),
    jibunAddress: z.string(),
    jibunAddressEnglish: z.string(),
    autoRoadAddress: z.string(),
    autoRoadAddressEnglish: z.string(),
    autoJibunAddress: z.string(),
    autoJibunAddressEnglish: z.string(),
    buildingCode: z.number(),
    buildingName: z.string(),
    apartment: z.enum(["Y", "N"]),
    sido: z.string(),
    sidoEnglish: z.string(),
    sigungu: z.string(),
    sigunguEnglish: z.string(),
    sigunguCode: z.string(),
    roadnameCode: z.string(),
    bcode: z.string(),
    roadname: z.string(),
    roadnameEnglish: z.string(),
    bname: z.string(),
    bnameEnglish: z.string(),
    bname1: z.string(),
    bname1English: z.string(),
    bname2: z.string(),
    bname2English: z.string(),
    hname: z.string(),
    query: z.string(),
    detailAddress: z.string().optional(),
  }),
  imageUuids: z.array(z.string()),
  contractInfo: z.object({
    residencyStartDate: z.date(),
    residencyEndDate: z.date(),
    contractPrice: z.object({
      deposit: z.number(),
      monthlyRent: z.number(),
      maintenanceFee: z.number(),
      contractPeriod: z.number(),
    }),
  }),
});
