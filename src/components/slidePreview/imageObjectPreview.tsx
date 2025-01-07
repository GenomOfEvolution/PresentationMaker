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
    width: `${Math.abs(imageObject.size.width) * scale}px`,
    height: `${Math.abs(imageObject.size.height) * scale}px`,
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  };

  if (imageObject.size.width < 0) {
    imageObjectStyles.transform = "scaleX(-1)";
    imageObjectStyles.left = `${(imageObject.pos.x + imageObject.size.width) * scale}px`;
  }

  if (imageObject.size.height < 0) {
    imageObjectStyles.transform = "scaleY(-1)";
    imageObjectStyles.top = `${(imageObject.pos.y + imageObject.size.height) * scale}px`;
  }

  return (
    <div style={imageObjectStyles}>
      <img style={{ width: "100%", height: "100%" }} src={imageObject.url} />
    </div>
  );
};

export { ImageObjectPreview };
