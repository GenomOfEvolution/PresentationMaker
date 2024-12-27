import { RefObject, useEffect, useRef } from "react";
import { Point, Size } from "../types/BaseTypes";

const useResize = (
  containerRef: RefObject<HTMLElement>,
  size: Size,
  position: Point,
  scale: number,
  onUpdateSize: (newSize: Size) => void,
  onUpdatePosition: (newPosition: Point) => void,
) => {
  const isResizing = useRef(false);

  const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const initialWidth = size.width;
    const initialHeight = size.height;
    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = (event.clientX - startX) / scale;
      const deltaY = (event.clientY - startY) / scale;

      let newWidth = initialWidth;
      let newHeight = initialHeight;
      let newX = initialX;
      let newY = initialY;

      if (direction.includes("right")) {
        newWidth = Math.max(10, initialWidth + deltaX);
      }
      if (direction.includes("left")) {
        newWidth = Math.max(10, initialWidth - deltaX);
        newX = initialX + deltaX;
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(10, initialHeight + deltaY);
      }
      if (direction.includes("top")) {
        newHeight = Math.max(10, initialHeight - deltaY);
        newY = initialY + deltaY;
      }

      onUpdateSize({ width: newWidth, height: newHeight });
      onUpdatePosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!isResizing.current) return;
      handleMouseDownResize(e, isResizing.current);
    };

    containerRef.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      containerRef.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [containerRef, size, position, scale, onUpdateSize, onUpdatePosition]);

  return {
    startResize: (direction: string) => {
      isResizing.current = direction;
    },
    stopResize: () => {
      isResizing.current = "";
    },
  };
};

export default useResize;
