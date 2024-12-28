import React, { CSSProperties } from "react";
import { Image } from "../../types/BaseTypes";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";
import { SelectionType } from "../../types/Selection";

type ImageObjectProps = {
  imageObject: Image;
  scale?: number;
  selection: SelectionType;
};

const ImageObject = ({ imageObject, scale = 1, selection }: ImageObjectProps) => {
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
    userSelect: "none",
  };

  const handleSlideObjectClick = useHandleSlideObjectClick(imageObject, selection);

  return (
    <div style={imageObjectStyles} onClick={(event) => handleSlideObjectClick(event)} draggable="false">
      <img style={contentStyles} src={imageObject.url} alt="Slide Object" />
    </div>
  );
};

export { ImageObject };
