import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";
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
  Input,
  FormErrorMessage,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

export function LoginPage() {
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const authContext = useAuthContext();
  const loginErrors = authContext.loginErrors;

  if (authContext.token) {
    return <Navigate to={"/"} />;
  }

  console.log({ loginErrors });

  return (
    <Container maxW="2xl" centerContent>
      <Heading mb={10}>Video Share</Heading>
      <Box>
        <Card align="center" width="sm">
          <CardHeader>
            <Heading size="md">Sign in</Heading>
          </CardHeader>
          <CardBody>
            <Text align="center" mb={3}>
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
                <FormControl
                  isInvalid={
                    loginErrors.username?.length > 0 || !!loginErrors.detail
                  }
                >
                  <Input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    isInvalid={
                      loginErrors.username?.length > 0 || !!loginErrors.detail
                    }
                    onChange={() => authContext.setLoginErrors({})}
                  />
                  {loginErrors.username?.length > 0 && (
                    <FormErrorMessage>
                      {loginErrors.username.join(", ")}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={
                    loginErrors.password?.length > 0 || !!loginErrors.detail
                  }
                >
                  <InputGroup>
                    <Input
                      type={isPasswordShown ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      isInvalid={
                        loginErrors.password?.length > 0 || !!loginErrors.detail
                      }
                      onChange={() => authContext.setLoginErrors({})}
                    />
                    <InputRightElement width={"4rem"}>
                      <Button
                        onClick={() =>
                          setIsPasswordShown((prevState) => !prevState)
                        }
                      >
                        {isPasswordShown ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {loginErrors.password?.length > 0 && (
                    <FormErrorMessage>
                      {loginErrors.password.join(", ")}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button isLoading={authContext.loading} type="submit">
                  Log in
                </Button>
                {loginErrors.detail && (
                  <Alert status="error" padding={"0 20px"}>
                    <AlertIcon />
                    <AlertDescription>{loginErrors.detail}</AlertDescription>
                  </Alert>
                )}
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
