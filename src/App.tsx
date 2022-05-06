import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const staticStories1: Story[] = [
    {
      url: "https://picsum.photos/1080/1920",
      type: "img",
      description:
        "Story Number 1, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi non eos, necessitatibus placeat unde assumenda in voluptatem dolore voluptatibus adipisci facere debitis facilis cum voluptas deleniti quis enim maiores repudiandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi non eos, necessitatibus placeat unde assumenda in voluptatem dolore voluptatibus adipisci facere debitis facilis cum voluptas deleniti quis enim maiores repudiandae?",
    },
    {
      url: "https://picsum.photos/1081/1921",
      type: "img",
      description: "Story Number 2",
    },
    {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video",
      description: "Story Number 3 | Video",
    },
    {
      url: "https://picsum.photos/1082/1922",
      type: "img",
      description: "Story Number 4",
    },
    {
      url: "https://picsum.photos/1083/1923",
      type: "img",
      description: "Story Number 5",
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
