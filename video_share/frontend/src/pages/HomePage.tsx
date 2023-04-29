import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
export function HomePage(): JSX.Element {
  const authContext = useAuthContext();
  return (
    <>
      Home Page <br />
      Hello {authContext.user.username}!
    </>
  );
}
