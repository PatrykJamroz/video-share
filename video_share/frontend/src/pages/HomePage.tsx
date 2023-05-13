import * as React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
export function HomePage(): JSX.Element {
  const [feed, setFeed] = useState([]);

  async function getFeed() {
    axiosInstance.get("/post-draft-list/").then((res) => setFeed(res.data));
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {feed.map((post) => (
        <p key={post.id}>{post.video_url}</p>
      ))}
    </>
  );
}
