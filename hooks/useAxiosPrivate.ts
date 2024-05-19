import { useEffect } from "react";

import { axiosPrivate } from "@/api/axios";
import useRefreshtoken from "./useRefreshToken";
import useAuth from "./useAuth";
import { AxiosError, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const useAxiosPrivate = () => {
  // const refresh = useRefreshtoken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        // for debugging
        // 오류 응답을 받은 경우
        if (error.response) {
          // 서버에서 오류 응답을 보낸 경우 (예: 404, 500 등)
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // 요청이 서버에 도달하지 않은 경우 (네트워크 오류)
          console.error("Network Error:", error.request);
          console.error("Network Error message:", error.message);
          alert("네트워크 오류입니다. 다시 시도해주세요.");
        } else {
          // 다른 오류 (예: 요청을 설정하는 중에 발생한 오류)
          console.error("Error:", error.message);
        }

        // if (!error.response) {
        //   alert("서버 응답이 없습니다.");
        // } else if (error.response?.status === 400) {
        //   alert("잘못된 요청입니다.");
        // } else if (error.response?.status === 401) {
        //   alert("인증이 필요합니다.");
        // } else if (error.response?.status === 403) {
        //   alert("권한이 없습니다.");
        // } else if (error.response?.status === 404) {
        //   alert("찾을 수 없습니다.");
        // } else if (error.response?.status === 500) {
        //   alert("서버에러입니다.");
        // } else {
        //   alert("알 수 없는 에러입니다.");
        // }

        // const prevRequest = error?.config as CustomAxiosRequestConfig;
        // if (error?.response?.status === 403 && !prevRequest?.sent) {
        //   prevRequest.sent = true;
        //   const newAccessToken = await refresh();
        //   if (prevRequest) {
        //     prevRequest.headers = {
        //       ...prevRequest.headers,
        //       Authorization: `Bearer ${newAccessToken}`,
        //     };
        //   }
        //   return axiosPrivate(prevRequest);
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
