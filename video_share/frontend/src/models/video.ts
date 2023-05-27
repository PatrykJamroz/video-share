export type VideoSrc = "youtube" | "vimeo";

export interface VideoData {
  id: string;
  videoSrc: VideoSrc;
  videoTitle: string;
  videoUrl: string;
  statistics: { likeCount: number; viewCount: number };
  channelTitle: string;
}

export interface YoutubeResponse {
  items: [
    {
      id: string;
      snippet: {
        channelTitle: string;
        description: string;
        title: string;
        thumbnails: {
          default: { url: string; width: number; height: number };
          high: { url: string; width: number; height: number };
          maxres: { url: string; width: number; height: number };
          medium: { url: string; width: number; height: number };
          standard: { url: string; width: number; height: number };
        };
      };
      statistics: { likeCount: number; viewCount: number };
    }
  ];
}
