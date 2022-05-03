import LoaderSVG from "../../assets/puff.svg";
import { LoaderContainer } from "./styles";
const Loader = () => {
  return (
    <LoaderContainer>
      <img src={LoaderSVG} alt="Loading..." />
    </LoaderContainer>
  );
};

export default Loader;
