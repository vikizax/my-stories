import { useEffect, useState, useRef } from "react";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";
import { useRecoilState } from "recoil";
import {
  ProgressContainer,
  ProgressItem,
  ProgressWrapperContainer,
} from "./styles";

// if (progress.status !== "paused" && progress.status !== "playing") {
//   const progressIntervalInSecs = progress.interval / 1000;
//   setIntervalSecs(progressIntervalInSecs);
//   storyTimeInterval = setInterval(() => {
//     if (timeTracker < progressIntervalInSecs)
//       setTimeTracker((prev) => prev + 1);
//     else {
//       console.log("INTERVAL OVER -> Go to next story");
//       // cleaer interval
//       storyTimeInterval && clearInterval(storyTimeInterval);
//     }
//   }, progress.interval);
// }

const Progress = () => {
  const [story, setStory] = useRecoilState(storyAtom);
  const [progress, setProgress] = useRecoilState(progressAtom);
  const [timeTracker, setTimeTracker] = useState<number>(0);
  // const [intervalSecs, setIntervalSecs] = useState<number>(1);
  let animationFrameId = useRef<number>();

  let currentTimer = timeTracker;
  const handleTimeTracker = () => {
    setTimeTracker((time: number) => {
      currentTimer = time + 100 / ((progress.interval / 1000) * 60);
      return time + 100 / ((progress.interval / 1000) * 60);
    });

    if (currentTimer < 100) {
      animationFrameId.current = requestAnimationFrame(handleTimeTracker);
    } else {
      // if (currentId === stories.length - 1) {
      //     allStoriesEndCallback();
      // }
      animationFrameId.current &&
        cancelAnimationFrame(animationFrameId.current);
      console.log("INTERVAL OVER -> Go to next story");
      // next();
    }
  };

  useEffect(() => {
    console.log("INSIDE PROGRESS COMPONENT");
    console.log({ progress });
    if (progress.isMounted) {
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
