import { useState } from "react";
import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const [mock, setMock] = useState<number>(0);
  const staticStories1: Story[] = [
    {
      url: "https://picsum.photos/1080/1920",
      type: "img",
    },
    {
      url: "https://picsum.photos/1081/1921",
      type: "img",
    },
    {
      url: "https://picsum.photos/1082/1922",
      type: "img",
    },
    {
      url: "https://picsum.photos/1083/1923",
      type: "img",
    },
    {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video",
    },
    {
      url: "  http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      type: "video",
    },
  ];

  return (
    <Stories
      stories={staticStories1}
      loop={false}
      
    />
  );
}

export default App;
