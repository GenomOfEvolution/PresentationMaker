import { RefObject, useEffect, useRef } from "react";

const useDragAndDrop = (
  childRef: RefObject<HTMLElement>,
  parentRef: RefObject<HTMLElement>,
  setPosition: (pos: { x: number; y: number }) => void,
) => {
  const startPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const shift = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!childRef.current || !parentRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const childRect = childRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      startPos.current = { x: e.clientX, y: e.clientY };
      initialPos.current = { x: childRect.left, y: childRect.top };
      shift.current = { x: e.clientX - childRect.left + parentRect.x, y: e.clientY - childRect.top + parentRect.y };
      isDragging.current = true;

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging.current || !childRef.current || !parentRef.current) return;

        const deltaX = event.clientX - startPos.current.x;
        const deltaY = event.clientY - startPos.current.y;

        let newPos = {
          x: initialPos.current.x + deltaX,
          y: initialPos.current.y + deltaY,
        };

        if (newPos.x < parentRect.x) {
          newPos.x = parentRect.x;
        } else if (newPos.x + 2 > parentRect.x + parentRect.width - childRect.width - 9) {
          newPos.x = parentRect.x + parentRect.width - childRect.width - 9;
        }

        if (newPos.y < parentRect.y) {
          newPos.y = parentRect.y;
        } else if (newPos.y + 2 > parentRect.y + parentRect.height - childRect.height - 9) {
          newPos.y = parentRect.y + parentRect.height - childRect.height - 9;
        }

        setPosition(newPos);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDownWithCheck = (e: MouseEvent) => {
      if (parentRef.current) {
        handleMouseDown(e);
      }
    };

    childRef.current?.addEventListener("mousedown", handleMouseDownWithCheck);

    return () => {
      childRef.current?.removeEventListener("mousedown", handleMouseDownWithCheck);
    };
  }, [childRef, parentRef, setPosition]);
};

export default useDragAndDrop;
