import { axios } from "@/api/axios";
import { useEffect } from "react";

const useAxios = () => {
  console.log("render useAxios");
  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      (response) => {
        console.log("response from axios: ", response);
        return response.data;
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

    return () => {
      axios.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axios;
};

export default useAxios;
