import * as React from "react";
import { Outlet } from "react-router";

export function Root(): JSX.Element {
  return (
    <>
      <h1>Video Share App</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
