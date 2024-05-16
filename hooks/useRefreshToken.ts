import { User } from "@/context/AuthProvider";
import useAuth from "./useAuth";
import { axios } from "@/api/axios";

interface RefreshRequest {
  refreshToken: string;
}

interface RefreshReponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

const useRefreshtoken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const { accessToken, expiresIn } = await axios.post<
      RefreshRequest,
      RefreshReponse
    >("/api/v1/refresh/google", { refreshToken: auth?.refreshToken });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: accessToken,
        expiresIn: expiresIn,
      } as User;
    });

    return accessToken;
  };

  return refresh;
};

export default useRefreshtoken;
