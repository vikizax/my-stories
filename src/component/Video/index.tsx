import { useState } from "react";
import { Video as VideoSC, VideoContainer } from "./styles";
import Loader from "../Loader";

export interface IVideoProps {
  vidUrl: string;
  videoContainerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
}

const Video = ({ vidUrl, videoStyle, videoContainerStyle }: IVideoProps) => {
  const [vidLoading, setVidLoading] = useState<boolean>(false);

  const handleVideoLoad = (status: boolean) => setVidLoading(status);

  return vidLoading ? (
    <Loader />
  ) : (
    <VideoContainer style={videoContainerStyle}>
      <VideoSC
        src={vidUrl}
        autoPlay
        controls={false}
        playsInline
        webkit-playsInline="true"
        onLoadStart={() => handleVideoLoad(true)}
        onLoadedData={() => handleVideoLoad(false)}
        style={videoStyle}
      />
    </VideoContainer>
  );
};

export default Video;
