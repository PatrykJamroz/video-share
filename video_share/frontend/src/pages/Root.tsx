import * as React from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../context/AuthProvider";

export function Root(): JSX.Element {
  const authContext = useAuthContext();

  return (
    <>
      <h1>Video Share App</h1>
      {authContext.user && (
        <button onClick={authContext.logoutUser}>Log out</button>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}
