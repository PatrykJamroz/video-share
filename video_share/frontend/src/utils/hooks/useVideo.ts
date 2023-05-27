import * as React from "react";
import { videoApi } from "../../api";
import { VideoData } from "../../models";

interface UseVideoProps {
  id: string;
  videoSrc: "youtube" | "vimeo";
}

interface UseVideoValue {
  videoData: VideoData;
}

export function useVideo(props: UseVideoProps): UseVideoValue {
  const [videoData, setVideoData] = React.useState<VideoData | null>(null);

  React.useEffect(() => {
    if (props.videoSrc === "youtube") {
      console.log("here");
      videoApi.getYoutubeVideo(props.id).then((res) => {
        const videoItem = res.items[0];
        setVideoData({
          id: props.id,
          videoUrl: `http://www.youtube.com/embed/${props.id}`,
          videoTitle: videoItem.snippet.title ?? "",
          videoSrc: "youtube",
          statistics: videoItem.statistics,
          channelTitle: videoItem.snippet.channelTitle,
        });
      });
    }
  }, [props.id]);

  return { videoData };
}
