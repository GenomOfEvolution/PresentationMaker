import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { Image } from "../../types/BaseTypes";
import { CSSProperties, useState } from "react";

type ImageObjectProps = {
  imageObject: Image;
  scale?: number;
  containerRef: any;
};

const ImageObject = ({ imageObject, scale = 1, containerRef }: ImageObjectProps) => {
  const [pos, setPosition] = useState(imageObject.pos);
  const [size, setSize] = useState(imageObject.size);
  const [dragging, setDragging] = useState(false);

  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${pos.y * scale}px`,
    left: `${pos.x * scale}px`,
    width: `${size.width * scale}px`,
    height: `${size.height * scale}px`,
    cursor: dragging ? "grabbing" : "grab",
    boxSizing: "border-box", // Учитываем рамку в размерах
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const { setCurrentElement } = useAppContext();

  const handleMouseDownMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const containerRect = containerRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = pos.x;
    const initialY = pos.y;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = (event.clientX - startX) / scale;
      const deltaY = (event.clientY - startY) / scale;

      setPosition({
        x: Math.max(0, Math.min(containerRect.width - size.width, initialX + deltaX)),
        y: Math.max(0, Math.min(containerRect.height - size.height, initialY + deltaY)),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      setDragging(false);
    };

    setDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div onMouseDown={handleMouseDownMove} style={imageObjectStyles}>
      <img
        style={{ width: "100%", height: "100%" }}
        onClick={() => {
          setCurrentElement(imageObject);
        }}
        src={`${imageObject.url}`}
      />
    </div>
  );
};

export { ImageObject };
