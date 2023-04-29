import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";
export function HomePage(): JSX.Element {
  const authContext = useAuthContext();

  if (!authContext.token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      Home Page <br />
      Hello {authContext.user.username}!
    </>
  );
}
