import { BuildingType } from "@/components/post/BuildingSelector";

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
