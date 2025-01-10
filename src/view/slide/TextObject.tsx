import React, { CSSProperties, useEffect, useRef } from "react";
import { Text } from "../../types/BaseTypes";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";
import { SelectionType } from "../../types/Selection";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";

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
    width: `${Math.abs(textObject.size.width) * scale}px`,
    height: `${Math.abs(textObject.size.height) * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    fontFamily: `${textObject.fontName}`,
    color: `${textObject.fontColor}`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    border: selection.selectedSlideObjectsId?.includes(textObject.id) ? "2px solid rgb(185, 210, 251)" : "none",
  };

  if (textObject.size.width < 0) {
    textObjectStyles.transform = "scaleX(-1)";
    textObjectStyles.left = `${(textObject.pos.x + textObject.size.width) * scale}px`;
  }

  if (textObject.size.height < 0) {
    textObjectStyles.transform = "scaleY(-1)";
    textObjectStyles.top = `${(textObject.pos.y + textObject.size.height) * scale}px`;
  }

  const handleSlideObjectClick = useHandleSlideObjectClick(textObject, selection);
  const { setCurrentElement } = useAppContext();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      const handleMouseDown = (event: MouseEvent) => {
        handleSlideObjectClick(event);
        setCurrentElement(textObject);
      };

      divElement.addEventListener("click", handleMouseDown);

      return () => {
        divElement.removeEventListener("click", handleMouseDown);
      };
    }
  }, [handleSlideObjectClick, setCurrentElement, textObject]);

  return (
    <div ref={divRef} style={textObjectStyles} id={textObject.id}>
      <span style={{ display: "block", width: Math.abs(textObject.size.width) * scale }}>{textObject.content}</span>
    </div>
  );
};

export { TextObject };
