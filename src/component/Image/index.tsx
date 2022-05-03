import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Loader from "../Loader";
import progressAtom from "../../recoil/atoms/progress.atom";
import { ImageContainer, Image as ImageSC } from "./styles";

export interface IImageProps {
  imgUrl: string;
  imageStyle?: React.CSSProperties;
  imageContainerStyle?: React.CSSProperties;
}

const Image = ({ imgUrl, imageContainerStyle, imageStyle }: IImageProps) => {
  const [progress, setProgress] = useRecoilState(progressAtom);

  const handleImageLoad = (status: boolean) => {
    setProgress((prev) => ({ ...prev, isLoading: false, isMounted: true }));
  };

  return (
    <>
      {progress.isLoading && <Loader />}
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
