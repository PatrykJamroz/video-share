import * as React from "react";
import { render } from "react-dom";
import { Root } from "../pages/Root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthProvider";
import { HomePage } from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

render(<App />, document.getElementById("root"));
