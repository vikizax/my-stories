import { useState, useEffect } from "react";
import { Story } from "./model/story.model";
import Stories from "./pages/Stories";
import refreshRate from "refresh-rate";
import Loader from "./component/Loader";
function App() {
  const [loading, setLoading] = useState(false);
  const [rRate, setRRate] = useState(60);
  const updateRefreshRate = async () => {
    setLoading(true);
    const fps = await refreshRate({ sampleCount: 140 });
    setLoading(false);
    setRRate(fps);
    console.log("updated refresh rate", fps);
  };

  useEffect(() => {
    updateRefreshRate();
  }, []);

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
      description: "lorem",
    },
  ];

  console.log("will be called");

  return loading ? (
    <Loader />
  ) : (
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
        width: "100%",
        fontFamily: "SW721CBold",
        fontSize: "20px",
        background: "#00000038",
      }}
      refreshRate={rRate}
      // displayLoader={loading}
    />
  );
}

export default App;
