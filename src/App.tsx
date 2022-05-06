import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const staticStories1: Story[] = [
    {
      url: "https://picsum.photos/1080/1920",
      type: "img",
      title: "Story Number 1",
    },
    {
      url: "https://picsum.photos/1081/1921",
      type: "img",
      title: "Story Number 2",
    },
    {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video",
      title: "Story Number 3 | Video",
    },
    {
      url: "https://picsum.photos/1082/1922",
      type: "img",
      title: "Story Number 4",
    },
    {
      url: "https://picsum.photos/1083/1923",
      type: "img",
      title: "Story Number 5",
    },
  ];

  return (
    <Stories
      stories={staticStories1}
      nextCallback={() => {
        console.log("FETCH NEXT STORIES!!");
      }}
      previousCallback={() => {
        console.log("FETCH PREVIOUS STORIES!!");
      }}
      closeCallback={() => {
        console.log("CLOSE STORIES!!");
      }}
    />
  );
}

export default App;
