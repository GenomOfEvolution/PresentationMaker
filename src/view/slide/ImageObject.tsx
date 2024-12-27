import React, { CSSProperties } from "react";
import { Image } from "../../types/BaseTypes";

type ImageObjectProps = {
  imageObject: Image;
  scale?: number;
  onSelect: (event: React.MouseEvent) => void;
};

const ImageObject = ({ imageObject, scale = 1, onSelect }: ImageObjectProps) => {
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
  };

  const contentStyles: CSSProperties = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={imageObjectStyles} onClick={onSelect}>
      <img style={contentStyles} src={imageObject.url} alt="Slide Object" />
    </div>
  );
};

export { ImageObject };
