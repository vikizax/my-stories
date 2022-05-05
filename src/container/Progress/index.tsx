import { useEffect, useState, useRef } from "react";
import statusAtom from "../../recoil/atoms/status.atom";
import timerAtom from "../../recoil/atoms/timer.atoms";
import { storiesSelector } from "../../recoil/selectors/story.selector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ProgressContainer,
  ProgressItem,
  ProgressWrapperContainer,
} from "./styles";
import { DEFAULT_INTERVAL } from "../../constant";

const Progress = () => {
  const story = useRecoilValue(storiesSelector);
  const [status, setStatus] = useRecoilState(statusAtom);
  const [timer, setTimer] = useRecoilState(timerAtom);
  const [currentIndexTracker, setCurrentIndexTracker] = useState<number>(
    status.currentIndex
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  let animationFrameId = useRef<number>();
  let currentTimer = timer.timeTracker;
  let startTime: number;

  const handleStoryAutoPlay = () => {
    // if the story current index is less then the total, go to next story
    if (status.currentIndex < status.total - 1) {
      const idx = currentIndexTracker;
      setStatus((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isLoading: true,
        isMounted: false,
      }));
      setTimer((prev) => ({
        interval:
          story[idx + 1].type === "img" ? DEFAULT_INTERVAL : prev.interval,
        timeTracker: 0,
      }));
    }
  };

  const handleTimeTracker = (timeStamp: number) => {
    // keep the start time
    if (!startTime) {
      startTime = timeStamp;
    }

    // calculate the time difference between start and now
    setTimer((prev) => {
      currentTimer = ((timeStamp - startTime) / timer.interval) * 100;
      return {
        ...prev,
        timeTracker: ((timeStamp - startTime) / prev.interval) * 100,
      };
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
    setTimer((prev) => ({ ...prev, timeTracker: 0 }));
    if (status.isMounted && !status.isLoading) {
      setIsPaused(false);
      setCurrentIndexTracker(status.currentIndex);
      animationFrameId.current = requestAnimationFrame(handleTimeTracker);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [status]);

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
              index === status.currentIndex
                ? timer.timeTracker
                : index < status.currentIndex
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
