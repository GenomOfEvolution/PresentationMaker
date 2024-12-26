import React, { useRef, useState, CSSProperties } from "react";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { Image } from "../../types/BaseTypes";

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
    cursor: "grab",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useDragAndDrop(ref, parentRef, setPosition);

  return (
    <div ref={ref} style={imageObjectStyles}>
      <img style={{ width: "100%", height: "100%" }} src={imageObject.url} alt={imageObject.alt || "Image"} />
    </div>
  );
};

export { ImageObject };
