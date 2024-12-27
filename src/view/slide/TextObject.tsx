import React, { CSSProperties } from "react";
import { Text } from "../../types/BaseTypes";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";
import { SelectionType } from "../../types/Selection";

type TextObjectProps = {
  textObject: Text;
  scale?: number;
  selection: SelectionType;
};

const TextObject = ({ textObject, scale = 1, selection }: TextObjectProps) => {
  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textObject.pos.y * scale}px`,
    left: `${textObject.pos.x * scale}px`,
    width: `${textObject.size.width * scale}px`,
    height: `${textObject.size.height * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    fontFamily: `${textObject.fontName}`,
    color: `${textObject.fontColor}`,
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSlideObjectClick = useHandleSlideObjectClick(textObject, selection);

  return (
    <p style={textObjectStyles} onClick={handleSlideObjectClick}>
      {textObject.content}
    </p>
  );
};

export { TextObject };
