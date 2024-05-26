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

export const contractPriceSchema = z.object({
  deposit: z.number(),
  monthlyFee: z.number(),
  maintenanceFee: z.number(),
});

export const contractInfoSchema = z.object({
  contractStartDate: z.date(),
  contractEndDate: z.date(),
  contractPrice: contractPriceSchema.optional(),
});

export const addressSchema = z.object({
  zonecode: z.string().or(z.number()),
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
  autoRoadAddress: z.string().optional(),
  autoRoadAddressEnglish: z.string().optional(),
  autoJibunAddress: z.string().optional(),
  autoJibunAddressEnglish: z.string().optional(),
  buildingCode: z.string().or(z.number()),
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
  bname1: z.string().optional(),
  bname1English: z.string().optional(),
  bname2: z.string().optional(),
  bname2English: z.string().optional(),
  hname: z.string().optional(),
  query: z.string(),
  detailAddress: z.string().optional(),
});

export const buildingTypeSchema = z.enum([
  "APARTMENT",
  "OFFICETEL",
  "HOUSE",
  "VILLA",
]);

export const postSchema = z.object({
  contractInfo: contractInfoSchema,
  address: addressSchema,
  buildingType: buildingTypeSchema,
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .max(200, "200자 이내로 입력해주세요."),
  description: z
    .string({ required_error: "설명을 입력해주세요." })
    .max(1000, "1000자 이내로 입력해주세요."),
  imageUuids: z.array(z.string()).optional(),
});

export type AddressState = z.infer<typeof addressSchema>;
export type BuildingType = z.infer<typeof buildingTypeSchema>;
export type Post = z.infer<typeof postSchema>;
