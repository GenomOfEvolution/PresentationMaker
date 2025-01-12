import { CSSProperties, useEffect, useRef, useState } from "react";
import { Text } from "../../types/BaseTypes";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick";
import { SelectionType } from "../../types/Selection";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { dispatch } from "../../store/editor";
import { updateText } from "../../store/functions/updateText";

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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(textObject.content);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      const handleMouseDown = (event: MouseEvent) => {
        handleSlideObjectClick(event);
        setCurrentElement(textObject);
      };

      const handleDoubleClick = () => {
        setIsEditing(true);
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (divElement && !divElement.contains(event.target as Node)) {
          setIsEditing(false);
          const id = textObject.id;
          const text: string = inputValue!;
          dispatch(updateText, { id, text });
        }
      };

      divElement.addEventListener("click", handleMouseDown);
      divElement.addEventListener("dblclick", handleDoubleClick);
      document.addEventListener("click", handleClickOutside);

      return () => {
        divElement.removeEventListener("click", handleMouseDown);
        divElement.removeEventListener("dblclick", handleDoubleClick);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [handleSlideObjectClick, setCurrentElement, textObject, inputValue]);

  return (
    <div ref={divRef} style={textObjectStyles} id={textObject.id}>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "transparent",
            fontSize: `${textObject.fontSize * scale}px`,
            fontFamily: textObject.fontName,
            color: textObject.fontColor,
            outline: "none",
            padding: 0,
            margin: 0,
          }}
        />
      ) : (
        <span style={{ display: "block", width: Math.abs(textObject.size.width) * scale, userSelect: "none" }}>
          {textObject.content}
        </span>
      )}
    </div>
  );
};

export { TextObject };
