import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const staticStories1: Story[] = [
    {
      url: "https://picsum.photos/1080/1920",
      type: "img",
    },
    {
      url: "https://picsum.photos/1081/1920",
      type: "img",
      title: "hh",
    },
    {
      url: "https://picsum.photos/1081/1920",
      type: "img",
      description: "hh",
    },
    {
      url: "https://picsum.photos/1081/1920",
      type: "img",
      title: "hh",
      description: "hh",
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
      interval={6000}
    />
  );
}

export default App;
