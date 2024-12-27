import { useRef, useState, useEffect, CSSProperties, RefObject } from "react";
import { Point, Size, SlideObject } from "../../types/BaseTypes";

type SelectorProps = {
  selectedObjectsId: string[];
  objects: SlideObject[];
  containerRef: RefObject<HTMLElement>;
};

const Selector = ({ selectedObjectsId, objects, containerRef }: SelectorProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectorPosition, setSelectorPosition] = useState<Point>({ x: 0, y: 0 });
  const [selectorSize, setSelectorSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (selectedObjectsId.length === 0 || !containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();

    const selectedObjects: SlideObject[] = objects.filter((elem) => selectedObjectsId.includes(elem.id));

    if (selectedObjects.length === 0) return;

    const minX = Math.min(...selectedObjects.map((elem) => elem.pos.x));
    const minY = Math.min(...selectedObjects.map((elem) => elem.pos.y));
    const maxX = Math.max(...selectedObjects.map((elem) => elem.pos.x + elem.size.width));
    const maxY = Math.max(...selectedObjects.map((elem) => elem.pos.y + elem.size.height));

    setSelectorPosition({ x: bounds.x + minX, y: bounds.y + minY });
    setSelectorSize({ width: maxX - minX, height: maxY - minY });
  }, [selectedObjectsId, objects, containerRef]);

  const selectorStyles: CSSProperties = {
    position: "absolute",
    top: `${selectorPosition.y}px`,
    left: `${selectorPosition.x}px`,
    width: `${selectorSize.width}px`,
    height: `${selectorSize.height}px`,
    border: "2px dashed #0b57d0",
    boxSizing: "border-box",
    pointerEvents: "none",
  };

  const handleStyles: CSSProperties = {
    position: "absolute",
    width: "5px",
    height: "5px",
    backgroundColor: "#0b57d0",
    zIndex: 10,
  };

  const topPos = `${selectorPosition.y - 2.5}px`;
  const leftPos = `${selectorPosition.x - 2.5}px`;
  const rightPos = `${selectorPosition.x + selectorSize.width - 2.5}px`;
  const botPos = `${selectorPosition.y + selectorSize.height - 2.5}px`;

  const handles = [
    { direction: "top-left", style: { top: topPos, left: leftPos, cursor: "nwse-resize" } },
    { direction: "top-right", style: { top: topPos, right: rightPos, cursor: "nesw-resize" } },
    { direction: "bottom-left", style: { bottom: botPos, left: leftPos, cursor: "nesw-resize" } },
    { direction: "bottom-right", style: { bottom: botPos, right: rightPos, cursor: "nwse-resize" } },
    { direction: "top", style: { top: topPos, left: "50%", transform: "translateX(-50%)", cursor: "ns-resize" } },
    { direction: "bottom", style: { bottom: botPos, left: "50%", transform: "translateX(-50%)", cursor: "ns-resize" } },
    { direction: "left", style: { top: "50%", left: leftPos, transform: "translateY(-50%)", cursor: "ew-resize" } },
    { direction: "right", style: { top: "50%", right: rightPos, transform: "translateY(-50%)", cursor: "ew-resize" } },
  ];

  return (
    <>
      <div ref={selectorRef} style={selectorStyles} />
    </>
  );
};

export default Selector;
