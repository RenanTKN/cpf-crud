import React from "react";

import { fakeAuthProvider } from "../auth";

export interface LoginData {
  username: string;
  password: string;
}

interface AuthContextType {
  user: any;
  signin: ({ username, password }: LoginData, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);

  const signin = (
    { username, password }: LoginData,
    callback: VoidFunction
  ) => {
    return fakeAuthProvider.signin({ username, password }, () => {
      fakeAuthProvider.isAuthenticated ? setUser(username) : setUser(null);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
