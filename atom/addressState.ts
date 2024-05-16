import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import { atom } from "recoil";

export interface AddressState extends OnCompleteParams {
  detailAddress?: string;
}

export const addressState = atom({
  key: "addressState",
  default: {} as AddressState,
});
