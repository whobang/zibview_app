import { User } from "@react-native-google-signin/google-signin";
import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {} as User,
});
