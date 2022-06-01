import { useRecoilState } from "recoil";
import Loader from "../Loader";
import statusAtom from "../../recoil/atoms/status.atom";
import { ImageContainer, Image as ImageSC } from "./styles";

export interface IImageProps {
  imgUrl: string;
  imageStyle?: React.CSSProperties;
  imageContainerStyle?: React.CSSProperties;
}

const Image = ({ imgUrl, imageContainerStyle, imageStyle }: IImageProps) => {
  const [status, setstatus] = useRecoilState(statusAtom);

  const handleImageLoad = (status: boolean) => {
    console.log("image loaded", status);
    setstatus((prev) => ({ ...prev, isLoading: status, isMounted: true }));
  };

  console.log("image component");

  return (
    <>
      {status.isLoading && <Loader />}
      <ImageContainer style={imageContainerStyle}>
        <ImageSC
          src={imgUrl}
          onLoad={() => handleImageLoad(false)}
          style={imageStyle}
        />
      </ImageContainer>
    </>
  );
};

export default Image;
