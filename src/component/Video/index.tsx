import { useRecoilState } from "recoil";
import progressAtom from "../../recoil/atoms/progress.atom";
import { Video as VideoSC, VideoContainer } from "./styles";
import Loader from "../Loader";
import { useEffect, useRef } from "react";

export interface IVideoProps {
  vidUrl: string;
  videoContainerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
}

const Video = ({ vidUrl, videoStyle, videoContainerStyle }: IVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useRecoilState(progressAtom);

  const handleVideoLoad = (status: boolean, duration?: number) => {
    setProgress((prev) => ({
      ...prev,
      interval: duration ? duration * 1000 : prev.interval,
      isLoading: status,
      isMounted: true,
    }));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [progress]);

  return (
    <>
      {progress.isLoading && <Loader />}
      <VideoContainer style={videoContainerStyle}>
        <VideoSC
          ref={videoRef}
          src={vidUrl}
          autoPlay
          controls={false}
          playsInline
          webkit-playsInline="true"
          onLoadStart={() => handleVideoLoad(true)}
          onLoadedData={(e) => {
            // @ts-ignore
            handleVideoLoad(false, e.target.duration);
          }}
          style={videoStyle}
        />
      </VideoContainer>
    </>
  );
};

export default Video;
