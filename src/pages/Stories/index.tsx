import { useEffect, useState } from "react";
import StoryRenderer from "../../container/StoryRenderer";
import { StoryModel } from "../../model/story.model";
import { StoryBody, StoryControlsOverlay, StoryControls } from "./styles";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import storyAtom from "../../recoil/atoms/story.atom";
import { storiesSelector } from "../../recoil/selectors/story.selector";
import progressAtom from "../../recoil/atoms/progress.atom";
import Progress from "../../container/Progress";
import { DEFAULT_INTERVAL } from "../../constant";
import { useDebounce } from "../../custom-hooks/useDebounce";

const Stories = (props: StoryModel) => {
  const setStory = useSetRecoilState(storyAtom);
  const stories = useRecoilValue(storiesSelector);
  const [progress, setProgress] = useRecoilState(progressAtom);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const debounceIsPaused = useDebounce(isPaused, 300);

  useEffect(() => {
    setStory(props);
    setProgress((prev) => ({
      ...prev,
      isLoading: true,
      isMounted: false,
      total: props.stories.length ?? 0,
    }));
  }, [props]);

  useEffect(() => {
    console.log(debounceIsPaused);
    if (debounceIsPaused) {
      console.log("PAUSED!!");
    }
  }, [debounceIsPaused]);

  const handleLeft = () => {
    if (progress.isMounted && !progress.isLoading && progress.currentIndex > 0)
      setProgress((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
        isLoading: true,
        isMounted: false,
        interval:
          stories[prev.currentIndex - 1].type === "img"
            ? DEFAULT_INTERVAL
            : prev.interval,
      }));
  };

  const handleRight = () => {
    if (
      progress.isMounted &&
      !progress.isLoading &&
      progress.currentIndex < progress.total - 1
    )
      setProgress((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isLoading: true,
        isMounted: false,
        interval:
          stories[prev.currentIndex + 1].type === "img"
            ? DEFAULT_INTERVAL
            : prev.interval,
      }));
  };

  return (
    <StoryBody style={props.storyBodyStyle}>
      <Progress />
      <StoryRenderer />
      <StoryControlsOverlay>
        <StoryControls
          onTouchStart={() => {
            setIsPaused(true);
          }}
          onTouchEnd={() => handleLeft()}
          onMouseDown={() => console.log("pause action")}
          onMouseUp={() => handleLeft()}
        />
        <StoryControls
          onTouchStart={() => console.log("pause action")}
          onTouchEnd={() => handleRight()}
          onMouseDown={() => console.log("pause action")}
          onMouseUp={() => handleRight()}
        />
      </StoryControlsOverlay>
    </StoryBody>
  );
};

export default Stories;
