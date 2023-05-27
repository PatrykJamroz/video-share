import * as React from "react";
import { useEffect, useState } from "react";
import { appApi } from "../api";
import { useVideo } from "../utils/hooks/useVideo";
import { Post as PostInterface } from "../models";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Box,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export function HomePage(): JSX.Element {
  const [feed, setFeed] = useState([]);

  async function getFeed() {
    appApi.getPosts().then((res) => {
      console.log("posts", res);
      setFeed(res);
    });
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {feed.map((post) => (
        <Post key={post.video_id} postData={post} />
      ))}
    </div>
  );
}

function Post(props: { postData: PostInterface }) {
  const { videoData } = useVideo({
    id: props.postData.video_id,
    videoSrc: props.postData.video_src,
  });
  return (
    <Card maxW="2xl" mt="6">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={props.postData.username} src="" />
            <Box>
              <Heading size="sm">{props.postData.username}</Heading>
              <Text>{props.postData.user_bio}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<HamburgerIcon />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <iframe
          id="inlineFrameExample"
          title="Inline Frame Example"
          src={videoData?.videoUrl ?? ""}
          width="640"
          height="360"
          loading="lazy"
        />
        <Stack mt="5" spacing="3">
          <Heading size="sm">{videoData?.videoTitle ?? ""}</Heading>
          <Text fontSize="xs">{`Channel: ${
            videoData?.channelTitle ?? ""
          }, Likes: ${videoData?.statistics?.likeCount ?? 0}, Views: ${
            videoData?.statistics?.viewCount ?? 0
          }`}</Text>
          <Text fontSize="sm">{props.postData.caption ?? ""}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
