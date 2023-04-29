import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";

export function LoginPage() {
  const authContext = useAuthContext();

  if (authContext.token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //TODO fix types
          authContext.loginUser(
            e.target.username.value,
            e.target.password.value
          );
        }}
      >
        <input type="text" name="username" placeholder="enter username" />
        <input type="password" name="password" placeholder="enter password" />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
