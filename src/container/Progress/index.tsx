import { useEffect, useState, useRef } from "react";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";
import { storiesSelector } from "../../recoil/selectors/story.selector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ProgressContainer,
  ProgressItem,
  ProgressWrapperContainer,
} from "./styles";

const Progress = () => {
  const story = useRecoilValue(storiesSelector);
  const [progress, setProgress] = useRecoilState(progressAtom);
  const [timeTracker, setTimeTracker] = useState<number>(0);
  const [currentIndexTracker, setCurrentIndexTracker] = useState<number>(
    progress.currentIndex
  );
  let animationFrameId = useRef<number>();
  let currentTimer = timeTracker;
  let startTime: number;

  const handleStoryAutoPlay = () => {
    // if the story current index is less then the total, go to next story
    if (currentIndexTracker < progress.total - 1) {
      const idx = currentIndexTracker;
      setCurrentIndexTracker(progress.currentIndex + 1);
      setProgress((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isLoading: true,
        isMounted: false,
        interval: story[idx + 1].type === "img" ? 6000 : prev.interval,
      }));
    }
  };

  const handleTimeTracker = (timeStamp: number) => {
    // keep the start time
    if (!startTime) {
      startTime = timeStamp;
    }

    // calculate the time difference between start and now
    setTimeTracker(() => {
      currentTimer = ((timeStamp - startTime) / progress.interval) * 100;
      return ((timeStamp - startTime) / progress.interval) * 100;
    });

    // if the animation reaches 100%, stop the timer
    if (currentTimer < 100) {
      animationFrameId.current = requestAnimationFrame(handleTimeTracker);
    } else {
      cancelAnimationFrame(animationFrameId.current!);
      handleStoryAutoPlay();
    }
  };

  useEffect(() => {
    currentTimer = 0;
    setTimeTracker(0);
    setCurrentIndexTracker(progress.currentIndex);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, [progress, story]);

  useEffect(() => {
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
      {story.map((_, index) => (
        <ProgressWrapperContainer
          style={{
            width: `${100 / story.length}%`,
          }}
          key={`progress-wrapper-${index}`}
        >
          <ProgressItem
            //@ts-ignore
            scale={
              index === currentIndexTracker
                ? timeTracker
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
