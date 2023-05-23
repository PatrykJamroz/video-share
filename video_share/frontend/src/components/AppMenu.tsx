import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { axiosInstance } from "../api/axiosInstance";

export function AppMenu() {
  const authContext = useAuthContext();

  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    axiosInstance.get("/profile/").then((res) => setProfile(res.data));
  }, []);

  return (
    <Container centerContent>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        alignItems={"center"}
        flexDir="column"
        width="100%"
        mt={5}
        // border={"pink 1px dashed"}
      >
        <Heading textAlign="center" mb={"1.5rem"}>
          Video Share
        </Heading>
        <Flex alignItems="center" flexDir="column">
          <Avatar
            size={"xl"}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            mb="0.5rem"
          />
          <Heading as="h4" size="lg">
            {authContext.user.username}
          </Heading>
          <Text fontSize="md">In love with React & Next</Text>
          <Text fontSize="sm">Posts: {profile?.post_count ?? 0}</Text>
          <Text fontSize="sm">Following: {profile?.following.length ?? 0}</Text>
          <Text fontSize="sm">Followers: {profile?.followers.length ?? 0}</Text>
        </Flex>
        <Button
          leftIcon={<HamburgerIcon boxSize={5} />}
          size={"lg"}
          colorScheme="teal"
          variant="link"
          mt="1rem"
        >
          Home
        </Button>
        <Button
          size={"lg"}
          leftIcon={<AddIcon boxSize={4} />}
          colorScheme="teal"
          variant="link"
          mt="1rem"
        >
          Create
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          mt="1.5rem"
          width={20}
          onClick={authContext.logoutUser}
        >
          Log out
        </Button>
      </Flex>
    </Container>
  );
}
