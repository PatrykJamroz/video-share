import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { appApi } from "../api/";
import { Profile } from "../models";

export function AppMenu() {
  const authContext = useAuthContext();

  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    appApi.getProfile().then((res) => setProfile(res));
  }, []);

  return (
    <Container centerContent>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        alignItems={"center"}
        flexDir="column"
        width="xs"
        mt={5}
      >
        <Heading textAlign="center" mb={"1.5rem"}>
          Video Share
        </Heading>
        <Flex alignItems="center" flexDir="column">
          <Avatar size={"xl"} name={profile?.username} src="" mb="0.5rem" />
          <Heading as="h4" size="lg">
            {profile?.username ?? ""}
          </Heading>
          <Text fontSize="md">{profile?.bio ?? ""}</Text>
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
