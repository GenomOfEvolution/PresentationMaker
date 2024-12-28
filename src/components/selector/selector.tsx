import { useRef, useState, useEffect, CSSProperties, RefObject } from "react";
import { Point, Size, SlideObject } from "../../types/BaseTypes";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useResize from "../../hooks/useResize";

type SelectorProps = {
  selectedObjectsId: string[];
  objects: SlideObject[];
  containerRef: RefObject<HTMLElement>;
  slideRef: RefObject<HTMLElement>;
  onUpdatePositions: (positions: { [id: string]: Point }) => void;
  onUpdateSizes: (sizes: { [id: string]: Size }) => void;
};

const Selector = ({
  selectedObjectsId,
  objects,
  containerRef,
  slideRef,
  onUpdatePositions,
  onUpdateSizes,
}: SelectorProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectorPosition, setSelectorPosition] = useState<Point>({ x: 0, y: 0 });
  const [selectorSize, setSelectorSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (selectedObjectsId.length === 0 || !containerRef.current || !slideRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const slideBounds = slideRef.current.getBoundingClientRect();

    const slideOffset = { x: slideBounds.x - bounds.x, y: slideBounds.y - bounds.y };

    const selectedObjects: SlideObject[] = objects.filter((elem) => selectedObjectsId.includes(elem.id));

    if (selectedObjects.length === 0) return;

    const minX = Math.min(...selectedObjects.map((elem) => elem.pos.x + slideOffset.x + 3));
    const minY = Math.min(...selectedObjects.map((elem) => elem.pos.y + slideOffset.y + 3));
    const maxX = Math.max(...selectedObjects.map((elem) => elem.pos.x + elem.size.width + slideOffset.x));
    const maxY = Math.max(...selectedObjects.map((elem) => elem.pos.y + elem.size.height + slideOffset.y));

    setSelectorPosition({ x: bounds.x + minX, y: bounds.y + minY });
    setSelectorSize({ width: maxX - minX, height: maxY - minY });
    console.log(selectorPosition);
  }, [selectedObjectsId, objects, containerRef]);

  useDragAndDrop(selectorRef, containerRef, (newPos) => {
    const deltaX = newPos.x - selectorPosition.x;
    const deltaY = newPos.y - selectorPosition.y;

    const newPositions: { [id: string]: Point } = {};
    const newSizes: { [id: string]: Size } = {};

    selectedObjectsId.forEach((id) => {
      const obj = objects.find((obj) => obj.id === id);
      if (obj) {
        newPositions[id] = {
          x: obj.pos.x + deltaX,
          y: obj.pos.y + deltaY,
        };
        newSizes[id] = obj.size;
      }
    });

    onUpdateSizes(newSizes);
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

  const handleStyles: CSSProperties = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "#0b57d0",
    zIndex: 10,
  };

  const topPos = `${selectorPosition.y - 5}px`;
  const leftPos = `${selectorPosition.x - 5}px`;
  const rightPos = `${selectorPosition.x + selectorSize.width - 5}px`;
  const botPos = `${selectorPosition.y + selectorSize.height - 5}px`;

  const midX = `${selectorPosition.x + (selectorSize.width - 5) / 2}px`;
  const midY = `${selectorPosition.y + (selectorSize.height - 5) / 2}px`;

  const handles = [
    { direction: "top-left", style: { top: topPos, left: leftPos, cursor: "nwse-resize" } },
    { direction: "top-right", style: { top: topPos, left: rightPos, cursor: "nesw-resize" } },
    { direction: "bottom-left", style: { top: botPos, left: leftPos, cursor: "nesw-resize" } },
    { direction: "bottom-right", style: { top: botPos, left: rightPos, cursor: "nwse-resize" } },

    { direction: "top", style: { top: topPos, left: midX, cursor: "ns-resize" } },
    { direction: "bottom", style: { top: botPos, left: midX, cursor: "ns-resize" } },
    { direction: "left", style: { top: midY, left: leftPos, cursor: "ew-resize" } },
    { direction: "right", style: { top: midY, left: rightPos, cursor: "ew-resize" } },
  ];

  const handleResize = useResize({
    selectorRef,
    containerRef,
    selectedObjectsId,
    objects,
    onUpdatePositions,
    onUpdateSizes,
  });

  return (
    <>
      <div ref={selectorRef} style={selectorStyles} />
      {selectedObjectsId.length === 1 && (
        <>
          {handles.map((handle) => (
            <div
              key={handle.direction}
              style={{ ...handleStyles, ...handle.style }}
              onMouseDown={(e) => handleResize(handle.direction, e)}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Selector;
