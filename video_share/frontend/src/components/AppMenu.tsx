import { Avatar, Box, Button, Heading } from "@chakra-ui/react";
import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";

export function AppMenu() {
  const authContext = useAuthContext();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading>Heding</Heading>
      <Box display={"flex"} flexDir="row">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Heading as="h4" size="md">
          {authContext.user.username}
        </Heading>
      </Box>
      <Button colorScheme="blue" onClick={authContext.logoutUser}>
        Log out
      </Button>
    </Box>
  );
}
