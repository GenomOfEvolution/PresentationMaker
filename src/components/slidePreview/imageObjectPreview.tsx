import { CSSProperties } from "react";
import { Image } from "../../types/BaseTypes";

export type ImageObjectPreviewProps = {
  imageObject: Image;
  scale: number;
};

const ImageObjectPreview = ({ imageObject, scale }: ImageObjectPreviewProps) => {
  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageObject.pos.y * scale}px`,
    left: `${imageObject.pos.x * scale}px`,
    width: `${imageObject.size.width * scale}px`,
    height: `${imageObject.size.height * scale}px`,
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  };

  return (
    <div style={imageObjectStyles}>
      <img style={{ width: "100%", height: "100%" }} src={imageObject.url} />
    </div>
  );
};

export { ImageObjectPreview };
