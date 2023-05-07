import * as React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
export function HomePage(): JSX.Element {
  const authContext = useAuthContext();
  const [feed, setFeed] = useState([]);

  async function getFeed() {
    axiosInstance.get("/post-draft-list/").then((res) => setFeed(res.data));
  }

  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed);

  return (
    <>
      Home Page <br />
      Hello {authContext.user.username}!
      {feed.map((post) => (
        <p key={post.id}>{post.video_url}</p>
      ))}
      {JSON.stringify(authContext.user)}
    </>
  );
}
