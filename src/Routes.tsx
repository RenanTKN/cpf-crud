import { Routes as RoutesList, Route } from "react-router-dom";

import { RequireAuth } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";

export default function Routes() {
  return (
    <RoutesList>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/:cpf"
        element={
          <RequireAuth>
            <UserInfo />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </RoutesList>
  );
}
