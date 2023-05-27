import { VideoSrc } from "./video";

export interface Post {
  id: number;
  user: number;
  username: string;
  user_bio: string;
  caption: string;
  video_id: string;
  video_src: VideoSrc;
  created_date: string;
}
