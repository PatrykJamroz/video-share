import * as React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthProvider";

interface Props {
  children: React.ReactElement | null;
}

export function ProtectedRoute(props: Props): JSX.Element {
  const authContext = useAuthContext();
  if (!authContext.user) {
    return <Navigate to={"/login"} replace />;
  }
  return props.children ? props.children : <Outlet />;
}
