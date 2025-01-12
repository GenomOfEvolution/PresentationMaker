import { RefObject, useRef, useEffect } from "react";
import { Point, Size } from "../types/BaseTypes";

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

    const selectorStyles = selectorRef.current?.style;

    const selectorRect = selectorRef.current!.getBoundingClientRect();
    let initialWidth = selectorRect.width;
    let initialHeight = selectorRect.height;

    if (selectorStyles?.transform.includes("scaleX(-1)")) {
      initialWidth = -Math.abs(initialWidth);
    }
    if (selectorStyles?.transform.includes("scaleY(-1)")) {
      initialHeight = -Math.abs(initialHeight);
    }

    const initialX = selectorRef.current!.getBoundingClientRect().left;
    const initialY = selectorRef.current!.getBoundingClientRect().top;

    initialSize.current = { width: initialWidth, height: initialHeight };
    initialPos.current = { x: initialX, y: initialY };

    isResizing.current = true;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      if (event.clientX < containerRect.left || event.clientX > containerRect.right - 9) {
        return;
      }

      if (event.clientY < containerRect.top || event.clientY > containerRect.bottom - 9) {
        return;
      }

      const deltaX = event.clientX - containerRect.left - startX;
      const deltaY = event.clientY - containerRect.top - startY;

      let newWidth = initialSize.current.width;
      let newHeight = initialSize.current.height;

      if (direction.includes("right")) {
        newWidth = initialSize.current.width + deltaX;
      }

      if (direction.includes("bottom")) {
        newHeight = initialSize.current.height + deltaY;
      }

      if (direction.includes("left")) {
        newWidth = initialSize.current.width - deltaX;
      }

      if (direction.includes("top")) {
        newHeight = initialSize.current.height - deltaY;
      }

      const newSizes: { [id: string]: Size } = {};
      const newPositions: { [id: string]: Point } = {};

      selectedObjectsId.forEach((id) => {
        const obj = objects.find((obj) => obj.id === id);
        console.log(obj?.size);
        if (obj) {
          if (obj.size.width < 0) {
            newWidth *= -1;
          }

          if (obj.size.height < 0) {
            newHeight *= -1;
          }

          newSizes[id] = {
            width: direction.includes("right") || direction.includes("left") ? newWidth : obj.size.width,
            height: direction.includes("bottom") || direction.includes("top") ? newHeight : obj.size.height,
          };

          newPositions[id] = {
            x:
              (direction.includes("left") && obj.size.width > 0) || (direction.includes("right") && obj.size.width < 0)
                ? obj.pos.x + deltaX
                : obj.pos.x,
            y:
              (direction.includes("top") && obj.size.height > 0) ||
              (direction.includes("bottom") && obj.size.height < 0)
                ? obj.pos.y + deltaY
                : obj.pos.y,
          };
        }
      });

      onUpdateSizes(newSizes);
      onUpdatePositions(newPositions);
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
