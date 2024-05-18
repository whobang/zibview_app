import axios from "axios";
import { useRouter } from "expo-router";
import { useAuth0 } from "react-native-auth0";

const useLogin = () => {
  const { user, authorize, getCredentials, error } = useAuth0();
  const router = useRouter();

  if (!user) {
    const login = async () => {
      try {
        await authorize(
          {
            scope: "openid profile email",
            audience: "http://localhost:8080",
          },
          { ephemeralSession: true }
        );
        const credentials = await getCredentials();

        if (error) router.replace("(tabs)");

        await axios.post("http://localhost:8080/api/v1/login", user, {
          headers: {
            Authorization: `Bearer ${credentials?.accessToken}`,
          },
        });
      } catch (e) {
        console.log(e);
        router.replace("(tabs)");
      }
    };
    login();
  }
};

export default useLogin;
