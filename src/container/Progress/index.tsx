import { useEffect, useState, useRef } from "react";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";
import { useRecoilState } from "recoil";
import {
  ProgressContainer,
  ProgressItem,
  ProgressWrapperContainer,
} from "./styles";

const Progress = () => {
  const [story, setStory] = useRecoilState(storyAtom);
  const [progress, setProgress] = useRecoilState(progressAtom);
  const [timeTracker, setTimeTracker] = useState<number>(0);

  let animationFrameId = useRef<number>();
  let currentTimer = timeTracker;
  let startTime: number;

  const handleTimeTracker = (timeStamp: number) => {
    if (!startTime) {
      startTime = timeStamp;
    }
    setTimeTracker(() => {
      currentTimer = ((timeStamp - startTime) / progress.interval) * 100;
      return ((timeStamp - startTime) / progress.interval) * 100;
    });

    if (currentTimer < 100) {
      animationFrameId.current = requestAnimationFrame(handleTimeTracker);
    } else {
      animationFrameId.current &&
        cancelAnimationFrame(animationFrameId.current);
      console.log("INTERVAL OVER -> Go to next story");
    }
  };

  useEffect(() => {
    console.log("INSIDE PROGRESS COMPONENT");
    console.log({ progress });
    if (progress.isMounted && !progress.isLoading) {
      animationFrameId.current = requestAnimationFrame(handleTimeTracker);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [progress]);

  return (
    <ProgressContainer>
      {story.stories.mode === "static" &&
        story.stories.static!.map((item, index) => (
          <ProgressWrapperContainer
            style={{
              width: `${100 / story.stories.static!.length}%`,
            }}
            key={`progress-wrapper-${index}`}
          >
            <ProgressItem
              progress={
                index === progress.currentIndex
                  ? currentTimer
                  : index < progress.currentIndex
                  ? 100
                  : 0
              }
              key={`progress-${index}`}
            />
          </ProgressWrapperContainer>
        ))}
    </ProgressContainer>
  );
};

export default Progress;
