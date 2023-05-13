import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router";
import {
  Container,
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

export function LoginPage() {
  const authContext = useAuthContext();

  const [loginData, setLoginData] = React.useState({
    userName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    userName: "k",
    password: "",
  });

  if (authContext.token) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container maxW="2xl" centerContent>
      <Heading>Video Share</Heading>
      <Box>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Sign in</Heading>
          </CardHeader>
          <CardBody>
            <Text align="center">
              Don't have an account? Click here to sign up
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
                //TODO fix types
                authContext.loginUser(
                  e.target.username.value,
                  e.target.password.value
                );
              }}
            >
              <Stack spacing={3}>
                <FormControl isInvalid={true}>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    isInvalid={true}
                  />
                  {true && <FormErrorMessage>Errror</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={true}>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      isInvalid={true}
                    />
                    <InputRightElement>
                      <Button>Show</Button>
                    </InputRightElement>
                  </InputGroup>
                  {true && <FormErrorMessage>pass incorrect</FormErrorMessage>}
                </FormControl>
                <input type="submit" value="Log in" />
              </Stack>
            </form>
          </CardBody>
          <CardFooter>
            ©{new Date().getFullYear()} Patryk Jamróz. All rights reserved
          </CardFooter>
        </Card>
      </Box>
    </Container>
  );
}
