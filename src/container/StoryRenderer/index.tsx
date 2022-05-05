import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "../../component/Image";
import Video from "../../component/Video";
import storyAtom from "../../recoil/atoms/story.atom";
import progressAtom from "../../recoil/atoms/progress.atom";

const StoryRenderer = () => {
  const story = useRecoilValue(storyAtom);
  const progress = useRecoilValue(progressAtom);

  return story.stories.length > 0 &&
    story.stories[progress.currentIndex].type === "img" ? (
    <Image
      imgUrl={story.stories[progress.currentIndex]?.url!}
      imageStyle={story.imageStyle}
      imageContainerStyle={story.imageContainerStyle}
    />
  ) : (
    <Video
      vidUrl={story.stories[progress.currentIndex]?.url!}
      videoStyle={story.videoStyle}
      videoContainerStyle={story.videoContainerStyle}
    />
  );
};

export default StoryRenderer;
