import React from "react";
import { Navigate, useLocation } from "react-router";

import { AuthContext, LoginData } from "../contexts/AuthContext";

const fakeDelay = (callback: VoidFunction) => setTimeout(callback, 500);

const fakeAuthProvider = {
  isAuthenticated: false,

  signin({ username, password }: LoginData, callback: VoidFunction) {
    fakeDelay(callback);
    if (username === "admin" && password === "admin") {
      fakeAuthProvider.isAuthenticated = true;
    }
  },

  signout(callback: VoidFunction) {
    fakeDelay(callback);
    fakeAuthProvider.isAuthenticated = false;
  },
};

const useAuth = () => React.useContext(AuthContext);

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!fakeAuthProvider.isAuthenticated) {
    return Navigate({ to: "/login", state: { from: location } });
  }

  return children;
};

export { fakeAuthProvider, useAuth, RequireAuth };
