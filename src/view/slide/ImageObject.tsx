import React, { CSSProperties } from "react";
import { Image } from "../../types/BaseTypes";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";
import { SelectionType } from "../../types/Selection";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";

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
    width: `${Math.abs(imageObject.size.width) * scale}px`,
    height: `${Math.abs(imageObject.size.height) * scale}px`,
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  imageObjectStyles.transform = "";
  if (imageObject.size.width < 0) {
    imageObjectStyles.transform += "scaleX(-1) ";
    imageObjectStyles.left = `${(imageObject.pos.x + imageObject.size.width) * scale}px`;
  }

  if (imageObject.size.height < 0) {
    imageObjectStyles.transform += " scaleY(-1)";
    imageObjectStyles.top = `${(imageObject.pos.y + imageObject.size.height) * scale}px`;
  }

  const contentStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    userSelect: "none",
  };

  const handleSlideObjectClick = useHandleSlideObjectClick(imageObject, selection);
  const { setCurrentElement } = useAppContext();

  return (
    <div
      style={imageObjectStyles}
      onClick={(event) => {
        handleSlideObjectClick(event);
        setCurrentElement(imageObject);
      }}
    >
      <img style={contentStyles} src={imageObject.url} draggable="false" alt="Slide Object" />
    </div>
  );
};

export { ImageObject };
