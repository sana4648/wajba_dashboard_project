import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth_provider";

export function AuthRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  );
}
