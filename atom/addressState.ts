import { AddressState } from "@/types/post/type";
import { atom } from "recoil";

export const addressState = atom({
  key: "addressState",
  default: {} as AddressState,
});
