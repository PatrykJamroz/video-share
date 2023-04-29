import * as React from "react";
import { render } from "react-dom";
import { HomePage } from "../pages/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);
export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

render(<App />, document.getElementById("root"));
