import React, { useRef, useState, CSSProperties } from "react";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { Text } from "../../types/BaseTypes";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { SelectionType } from "../../types/Selection";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";

type TextObjectProps = {
  textObject: Text;
  scale?: number;
  parentRef: React.RefObject<HTMLElement>;
  selection: SelectionType;
};

const TextObject = ({ textObject, scale = 1, parentRef, selection }: TextObjectProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [pos, setPosition] = useState(textObject.pos);

  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${pos.y * scale}px`,
    left: `${pos.x * scale}px`,
    width: `${textObject.size.width * scale}px`,
    height: `${textObject.size.height * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    fontFamily: `${textObject.fontName}`,
    color: `${textObject.fontColor}`,
  };

  if (selection.selectedSlideObjectsId?.includes(textObject.id)) {
    textObjectStyles.boxShadow = "0 0 0 3px #0b57d0";
  }
  const handleSlideObjectClick = useHandleSlideObjectClick(textObject);
  useDragAndDrop(ref, parentRef, setPosition);

  const { setCurrentElement } = useAppContext();

  return (
    <div
      ref={ref}
      style={textObjectStyles}
      onClick={(event) => {
        setCurrentElement(textObject);
        handleSlideObjectClick(selection, event);
      }}
    >
      <span style={{ display: "block", width: textObject.size.width * scale }}>{textObject.content}</span>
    </div>
  );
};

export { TextObject };
