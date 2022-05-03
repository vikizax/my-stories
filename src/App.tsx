import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const staticStories: Story[] = [
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
  ];
  
  return (
    <Stories
      stories={{
        mode: "static",
        static: staticStories,
      }}
    />
  );
}

export default App;
