import React, { CSSProperties } from "react";
import { Text } from "../../types/BaseTypes";

type TextObjectProps = {
  textObject: Text;
  scale?: number;
  onSelect: (event: React.MouseEvent) => void;
};

const TextObject = ({ textObject, scale = 1, onSelect }: TextObjectProps) => {
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

  return (
    <p style={textObjectStyles} onClick={onSelect}>
      {textObject.content}
    </p>
  );
};

export { TextObject };
