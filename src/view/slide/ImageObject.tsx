import React, { useRef, useState, CSSProperties } from "react";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { Image } from "../../types/BaseTypes";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";

type ImageObjectProps = {
  imageObject: Image;
  scale?: number;
  parentRef: React.RefObject<HTMLElement>;
};

const ImageObject = ({ imageObject, scale = 1, parentRef }: ImageObjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPosition] = useState(imageObject.pos);

  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${pos.y * scale}px`,
    left: `${pos.x * scale}px`,
    width: `${imageObject.size.width * scale}px`,
    height: `${imageObject.size.height * scale}px`,
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useDragAndDrop(ref, parentRef, setPosition);
  const { setCurrentElement } = useAppContext();

  return (
    <div
      ref={ref}
      style={imageObjectStyles}
      onClick={() => {
        setCurrentElement(imageObject);
      }}
    >
      <img style={{ width: "100%", height: "100%" }} src={imageObject.url} />
    </div>
  );
};

export { ImageObject };
