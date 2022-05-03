import StoryRenderer from "../../container/StoryRenderer";
import { StoryModel } from "../../model/story.model";
import { StoryBody, StoryControlsOverlay, StoryControls } from "./styles";
import { useSetRecoilState, useRecoilState } from "recoil";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";

import { useEffect } from "react";
import Progress from "../../container/Progress";

const Stories = (props: StoryModel) => {
  const setStory = useSetRecoilState(storyAtom);
  const [progress, setProgress] = useRecoilState(progressAtom);
  console.log(props.stories.static?.length);
  useEffect(() => {
    setStory(props);
    setProgress((prev) => ({
      ...prev,
      isLoading: true,
      total: props.stories.static?.length ?? 0,
    }));
  }, [props]);

  const handleLeft = () => {
    if (progress.isMounted && !progress.isLoading && progress.currentIndex > 0)
      setProgress((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
        isLoading: true,
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
      }));
  };

  return (
    <StoryBody style={props.storyBodyStyle}>
      <Progress />
      <StoryRenderer />
      <StoryControlsOverlay>
        <StoryControls
          onTouchStart={() => console.log("pause action")}
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
