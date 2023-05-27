import axios from "axios";
import { API_KEY } from "../../crede";
import { YoutubeResponse } from "../models";

export const videoApi = {
  async getYoutubeVideo(videoId: string): Promise<YoutubeResponse> {
    const URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY.youtube}&part=snippet,contentDetails,statistics,status`;
    const { data } = await axios.get(URL);
    return data;
  },
  async getVimeoVideo() {
    const URL = `https://api.vimeo.com/videos/${videoID}/?access_token=${API_KEY.vimeo}`;
    const { data } = await axios.get(URL);
    return data;
  },
};
