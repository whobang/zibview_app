import { useStorageState } from "@/hooks/useStorageState";
import React, { createContext, useEffect, useState } from "react";

export interface User {
  email: string | null;
  name: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  pictureUrl: string | undefined;
  accessToken: string;
  refreshToken: string | undefined;
  expiresIn: number;
}

export interface Auth {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<Auth>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [authState, setAuthState] = useStorageState("authState");

  // console.log("auth: ", auth);
  // console.log("authState: ", authState);

  useEffect(() => {
    authState && setAuth(JSON.parse(authState) as User);
  }, [authState]);

  useEffect(() => {
    auth && setAuthState(JSON.stringify(auth) as string);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
