import { useStorageState } from "@/hooks/useStorageState";
import React, { createContext, useEffect, useState } from "react";

export interface User {
  accessToken: string;
}

export interface Auth {
  auth: User | null;
  setAuth: (auth: User | null) => void;
}

export const AuthContext = createContext<Auth>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [authState, setAuthState] = useStorageState("authState");

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
