import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthProvider";

interface Props {
  children: React.ReactElement | null;
}

export function ProtectedRoute(props: Props): JSX.Element {
  const authContext = useAuthContext();
  const location = useLocation();

  if (!authContext.user) {
    return (
      <Navigate
        to={"/login"}
        replace
        state={{ redirectedFrom: location.pathname }}
      />
    );
  }
  //TODO probably outlet not required, redirect does not work
  return props.children ? props.children : <Outlet />;
}
