import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { Text } from "../../types/BaseTypes";
import { CSSProperties } from "react";

type TextObjectProps = {
  textObject: Text;
  scale?: number;
};

const TextObject = ({ textObject, scale = 1 }: TextObjectProps) => {
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

  const textObjectBoxProperties: CSSProperties = {};

  const { setCurrentElement } = useAppContext();

  return (
    <>
      <p
        style={textObjectStyles}
        onClick={() => {
          setCurrentElement(textObject);
        }}
      >
        {textObject.content}
      </p>
    </>
  );
};

export { TextObject };
