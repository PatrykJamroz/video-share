import * as React from "react";
import { render } from "react-dom";
import { Root } from "../pages/Root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthProvider";
import { HomePage } from "../pages/HomePage";
import { Dashboard } from "../pages/Dashboard";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    element: (
      <ChakraProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </ChakraProvider>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

render(<App />, document.getElementById("root"));
