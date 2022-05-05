import { useRecoilState } from "recoil";
import statusAtom from "../../recoil/atoms/status.atom";
import timerAtom from "../../recoil/atoms/timer.atoms";
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
  const [status, setStatus] = useRecoilState(statusAtom);
  const [timer, setTimer] = useRecoilState(timerAtom);

  const handleVideoLoad = (status: boolean, duration?: number) => {
    setStatus((prev) => ({
      ...prev,
      isLoading: status,
      isMounted: true,
    }));
    setTimer((prev) => ({
      ...prev,
      interval: duration ? duration * 1000 : prev.interval,
    }));
  };

  useEffect(() => {
    if (videoRef.current) {
      if (status.isLoading && !status.isMounted) {
        setStatus((prev) => ({
          ...prev,
          isMounted: true,
          isLoading: false,
        }));
        setTimer((prev) => ({
          ...prev,
          interval: videoRef.current?.duration
            ? videoRef.current?.duration * 1000
            : prev.interval,
        }));
      }
      videoRef.current.currentTime = 0;
    }
  }, [status]);

  return (
    <>
      {status.isLoading && <Loader />}
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
