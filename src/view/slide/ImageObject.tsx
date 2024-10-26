import { Image } from "../../types/BaseTypes";
import { CSSProperties } from "react";

type ImageObjectProps = {
  imageObject: Image;
  scale?: number;
};

function ImageObject({ imageObject, scale = 1 }: ImageObjectProps) {
  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageObject.pos.y * scale}px`,
    left: `${imageObject.pos.x * scale}px`,
    width: `${imageObject.size.width * scale}px`,
    height: `${imageObject.size.height * scale}px`,
  };
  return <img style={imageObjectStyles} src={`${imageObject.url}`} />;
}

export { ImageObject };
