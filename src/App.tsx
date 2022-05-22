import { Story } from "./model/story.model";
import Stories from "./pages/Stories";

function App() {
  const staticStories1: Story[] = [
    {
      url: "https://picsum.photos/1080/1920",
      type: "img",
    },
    {
      url: "https://picsum.photos/1081/1921",
      type: "img",
      title: "hh",
    },
    {
      url: "https://picsum.photos/1081/1922",
      type: "img",
      description: "hh",
    },
    {
      url: "https://picsum.photos/1081/1923",
      type: "img",
      title: "hh",
      description:
        "lorem, lorem, lorem, lorem, lorem, lorem,lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, lorem lorem, lorem, lorem, loremlorem, lorem, lorem, lorem",
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
      bottomContainerStyle={{
        background: "unset",
        display: "flex",
        justifyContent: "center",
      }}
      bottomTextStyle={{
        width: "fit-content",
        height: "fit-content",
        textAlign: "left",
        fontFamily: "SW721CBold",
        fontSize: "20px",
        margin: "0 15px",
        background: "#00000038",
      }}
    />
  );
}

export default App;
