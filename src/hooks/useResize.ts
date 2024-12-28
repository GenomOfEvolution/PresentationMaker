import { RefObject, useRef, useEffect } from "react";
import { Point, Size } from "../types/BaseTypes";
import { dispatch } from "../store/editor";
import { updatePosition } from "../store/functions/updatePosition";

type ResizeHookProps = {
  selectorRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLElement>;
  selectedObjectsId: string[];
  objects: { id: string; pos: Point; size: Size }[];
  onUpdatePositions: (positions: { [id: string]: Point }) => void;
  onUpdateSizes: (sizes: { [id: string]: Size }) => void;
};

const useResize = ({
  selectorRef,
  containerRef,
  selectedObjectsId,
  objects,
  onUpdatePositions,
  onUpdateSizes,
}: ResizeHookProps) => {
  const isResizing = useRef(false);
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const handleMouseDownResize = (direction: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const startX = event.clientX - containerRect.left;
    const startY = event.clientY - containerRect.top;

    const initialWidth = selectorRef.current!.getBoundingClientRect().width;
    const initialHeight = selectorRef.current!.getBoundingClientRect().height;
    const initialX = selectorRef.current!.getBoundingClientRect().left;
    const initialY = selectorRef.current!.getBoundingClientRect().top;

    initialSize.current = { width: initialWidth, height: initialHeight };
    initialPos.current = { x: initialX, y: initialY };

    isResizing.current = true;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const deltaX = event.clientX - containerRect.left - startX;
      const deltaY = event.clientY - containerRect.top - startY;

      let newWidth = initialSize.current.width;
      let newHeight = initialSize.current.height;
      let newX = initialPos.current.x;
      let newY = initialPos.current.y;

      if (direction.includes("right")) {
        newWidth = Math.max(10, initialSize.current.width + deltaX);
      }

      if (direction.includes("bottom")) {
        newHeight = Math.max(10, initialSize.current.height + deltaY);
      }

      if (direction.includes("left")) {
        newWidth = Math.max(10, initialSize.current.width - deltaX);
        newX = initialPos.current.x - initialSize.current.width * 2 + deltaX;
      }

      if (direction.includes("top")) {
        newHeight = Math.max(10, initialSize.current.height - deltaY);
        newY = initialPos.current.y - initialSize.current.height * 2 + deltaY;
      }

      console.log("JOPA123");

      const newSizes: { [id: string]: Size } = {};
      const newPositions: { [id: string]: Point } = {};

      selectedObjectsId.forEach((id) => {
        const obj = objects.find((obj) => obj.id === id);
        if (obj) {
          newSizes[id] = {
            width: direction.includes("right") || direction.includes("left") ? newWidth : obj.size.width,
            height: direction.includes("bottom") || direction.includes("top") ? newHeight : obj.size.height,
          };
          newPositions[id] = {
            x: direction.includes("left") ? newX : obj.pos.x,
            y: direction.includes("top") ? newY : obj.pos.y,
          };
        }
      });

      onUpdateSizes(newSizes);
      onUpdatePositions(newPositions);

      if (selectorRef.current) {
        selectorRef.current.style.width = `${newWidth}px`;
        selectorRef.current.style.height = `${newHeight}px`;
        selectorRef.current.style.left = `${newX}px`;
        selectorRef.current.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseDownResize);
      document.removeEventListener("mouseup", handleMouseDownResize);
    };
  }, []);

  return handleMouseDownResize;
};

export default useResize;
