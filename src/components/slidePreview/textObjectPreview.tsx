import { CSSProperties } from "react";

import { Text } from "../../types/BaseTypes";

type TextObjectPreviewProps = {
  textObject: Text;
  scale: number;
};

const TextObjectPreview = ({ textObject, scale }: TextObjectPreviewProps) => {
  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textObject.pos.y * scale}px`,
    left: `${textObject.pos.x * scale}px`,
    width: `${textObject.size.width * scale}px`,
    height: `${textObject.size.height * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    fontFamily: `${textObject.fontName}`,
    color: `${textObject.fontColor}`,
  };

  return (
    <div style={textObjectStyles}>
      <span style={{ display: "block", width: textObject.size.width * scale }}>{textObject.content}</span>
    </div>
  );
};

export { TextObjectPreview };
