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
    width: `${Math.abs(textObject.size.width) * scale}px`,
    height: `${Math.abs(textObject.size.height) * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    fontFamily: `${textObject.fontName}`,
    color: `${textObject.fontColor}`,
    background: `${textObject.blockBgColor}`,
    border: `${2 * scale}px solid ${textObject.blockBorderColor}`,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };

  if (textObject.size.width < 0) {
    textObjectStyles.transform = "scaleX(-1)";
    textObjectStyles.left = `${(textObject.pos.x + textObject.size.width) * scale}px`;
  }

  if (textObject.size.height < 0) {
    textObjectStyles.transform = "scaleY(-1)";
    textObjectStyles.top = `${(textObject.pos.y + textObject.size.height) * scale}px`;
  }

  return (
    <div style={textObjectStyles}>
      <span style={{ display: "block", width: textObject.size.width * scale, background: `${textObject.fontBgColor}` }}>
        {textObject.content}
      </span>
    </div>
  );
};

export { TextObjectPreview };
