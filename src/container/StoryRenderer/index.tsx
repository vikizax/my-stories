import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from "../../component/Image";
import Video from "../../component/Video";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";
import { Story } from "../../model/story.model";

const StoryRenderer = () => {
  const story = useRecoilValue(storyAtom);
  const [progress, setProgress] = useRecoilState(progressAtom);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  useEffect(() => {
    if (story.stories.mode === "static") {
      setCurrentStory(story.stories?.static?.[progress.currentIndex]!);
    }
  }, [story, progress]);

  return currentStory?.type === "img" ? (
    <Image
      imgUrl={currentStory?.url!}
      imageStyle={story.imageStyle}
      imageContainerStyle={story.imageContainerStyle}
    />
  ) : (
    <Video
      vidUrl={currentStory?.url!}
      videoStyle={story.videoStyle}
      videoContainerStyle={story.videoContainerStyle}
    />
  );
};

export default StoryRenderer;
