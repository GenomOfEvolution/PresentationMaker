import { useRef, useState, useEffect, CSSProperties, RefObject } from "react";
import { Point, Size, SlideObject } from "../../types/BaseTypes";
import useDragAndDrop from "../../hooks/useDragAndDrop";

type SelectorProps = {
  selectedObjectsId: string[];
  objects: SlideObject[];
  containerRef: RefObject<HTMLElement>;
  onUpdatePositions: (positions: { [id: string]: Point }) => void;
};

const Selector = ({ selectedObjectsId, objects, containerRef, onUpdatePositions }: SelectorProps) => {
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

  useDragAndDrop(selectorRef, containerRef, (newPos) => {
    const deltaX = newPos.x - selectorPosition.x;
    const deltaY = newPos.y - selectorPosition.y;

    const newPositions: { [id: string]: Point } = {};

    selectedObjectsId.forEach((id) => {
      const obj = objects.find((obj) => obj.id === id);
      if (obj) {
        newPositions[id] = {
          x: obj.pos.x + deltaX,
          y: obj.pos.y + deltaY,
        };
      }
    });

    console.log(newPositions);

    onUpdatePositions(newPositions);
    setSelectorPosition(newPos);
  });

  const selectorStyles: CSSProperties = {
    position: "absolute",
    top: `${selectorPosition.y}px`,
    left: `${selectorPosition.x}px`,
    width: `${selectorSize.width}px`,
    height: `${selectorSize.height}px`,
    boxShadow: "0 0 0 3px #0b57d0",
    boxSizing: "border-box",
  };

  return <div ref={selectorRef} style={selectorStyles} />;
};

export default Selector;
