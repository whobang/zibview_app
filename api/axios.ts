import { Platform } from "react-native";
import Axios, { AxiosInstance } from "axios";

const BASE_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_API_URL
    : process.env.EXPO_PUBLIC_ANDROID_API_URL;

export const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.log("error: ", error);
      alert("서버 응답이 없습니다.");
    } else if (error.response?.status === 400) {
      alert("잘못된 요청입니다.");
    } else if (error.response?.status === 401) {
      alert("인증이 필요합니다.");
    } else if (error.response?.status === 403) {
      alert("권한이 없습니다.");
    } else if (error.response?.status === 404) {
      alert("찾을 수 없습니다.");
    } else if (error.response?.status === 500) {
      alert("서버에러입니다.");
    } else {
      alert("알 수 없는 에러입니다.");
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
