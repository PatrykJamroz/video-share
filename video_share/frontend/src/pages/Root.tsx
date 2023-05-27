import * as React from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../context/AuthProvider";
import { Flex, Box } from "@chakra-ui/react";
import { AppMenu } from "../components/AppMenu";
import { LoginPage } from "./LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate, useLocation } from "react-router";

export function Root(): JSX.Element {
  const authContext = useAuthContext();

  if (!authContext.user) {
    return <LoginPage />;
  }

  return (
    <Flex w="100%">
      <Box w="30%" position="sticky" top="0">
        <AppMenu />
      </Box>
      <Box w="70%" ml="1%">
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </Box>
    </Flex>
  );
}
