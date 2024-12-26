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
      initialPos.current = { x: childRect.left - parentRect.left, y: childRect.top - parentRect.top };
      shift.current = { x: e.clientX - childRect.left, y: e.clientY - childRect.top };
      isDragging.current = true;

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging.current || !childRef.current || !parentRef.current) return;

        const deltaX = event.clientX - startPos.current.x;
        const deltaY = event.clientY - startPos.current.y;

        const parentRect = parentRef.current.getBoundingClientRect();
        const childRect = childRef.current.getBoundingClientRect();

        let newPos = {
          x: initialPos.current.x + deltaX,
          y: initialPos.current.y + deltaY,
        };

        if (newPos.x < 0) {
          newPos.x = 0;
        } else if (newPos.x > parentRect.width - childRect.width) {
          newPos.x = parentRect.width - childRect.width;
        }

        if (newPos.y < 0) {
          newPos.y = 0;
        } else if (newPos.y > parentRect.height - childRect.height) {
          newPos.y = parentRect.height - childRect.height;
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
