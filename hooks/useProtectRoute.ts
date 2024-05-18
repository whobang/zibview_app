import { useAuth0 } from "react-native-auth0";

const useProtectRoute = () => {
  const { user } = useAuth0();
  return !user;
};

export default useProtectRoute;
