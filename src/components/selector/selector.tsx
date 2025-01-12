import { useRef, useState, useEffect, CSSProperties, RefObject } from "react";
import { Point, Size, SlideObject } from "../../types/BaseTypes";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useResize from "../../hooks/useResize";
import styles from "./selector.module.css";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { setSelectionSlide } from "../../store/functions/setSelectionSlide";
import { dispatch } from "../../store/editor";
import { SelectionType } from "../../types/Selection";

type SelectorProps = {
  selection: SelectionType;
  objects: SlideObject[];
  containerRef: RefObject<HTMLElement>;
  slideRef: RefObject<HTMLElement>;
  onUpdatePositions: (positions: { [id: string]: Point }) => void;
  onUpdateSizes: (sizes: { [id: string]: Size }) => void;
};

const Selector = ({ selection, objects, containerRef, slideRef, onUpdatePositions, onUpdateSizes }: SelectorProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectorPosition, setSelectorPosition] = useState<Point>({ x: 0, y: 0 });
  const [selectorSize, setSelectorSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSelector = () => {
      if (selection.selectedSlideObjectsId!.length === 0 || !containerRef.current || !slideRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const slideBounds = slideRef.current.getBoundingClientRect();

      const slideOffset = { x: slideBounds.x - bounds.x, y: slideBounds.y - bounds.y };

      const selectedObjects: SlideObject[] = objects.filter((elem) =>
        selection.selectedSlideObjectsId!.includes(elem.id),
      );

      if (selectedObjects.length === 0) return;

      const minX = Math.min(
        ...selectedObjects.map((elem) => elem.pos.x + (elem.size.width < 0 ? elem.size.width : 0) + slideOffset.x + 1),
      );
      const minY = Math.min(
        ...selectedObjects.map(
          (elem) => elem.pos.y + (elem.size.height < 0 ? elem.size.height : 0) + slideOffset.y + 1,
        ),
      );
      const maxX = Math.max(
        ...selectedObjects.map((elem) => elem.pos.x + (elem.size.width > 0 ? elem.size.width : 0) + slideOffset.x + 1),
      );
      const maxY = Math.max(
        ...selectedObjects.map(
          (elem) => elem.pos.y + (elem.size.height > 0 ? elem.size.height : 0) + slideOffset.y + 1,
        ),
      );

      setSelectorPosition({ x: bounds.x + minX, y: bounds.y + minY });
      setSelectorSize({ width: maxX - minX, height: maxY - minY });
    };

    updateSelector();

    const handleResize = () => {
      updateSelector();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selection, objects, containerRef, slideRef]);

  useDragAndDrop(selectorRef, containerRef, selection.selectedSlideObjectsId!, (newPos) => {
    const deltaX = newPos.x - selectorPosition.x;
    const deltaY = newPos.y - selectorPosition.y;

    const newPositions: { [id: string]: Point } = {};
    const newSizes: { [id: string]: Size } = {};

    selection.selectedSlideObjectsId!.forEach((id) => {
      const obj = objects.find((obj) => obj.id === id);
      if (obj) {
        newPositions[id] = {
          x: obj.pos.x + deltaX,
          y: obj.pos.y + deltaY,
        };

        if (selectorSize.width < 0) {
          newPositions[id].x -= selectorSize.width;
        }

        if (selectorSize.height < 0) {
          newPositions[id].y -= selectorSize.height;
        }
      }
    });

    onUpdateSizes(newSizes);
    onUpdatePositions(newPositions);
    setSelectorPosition(newPos);
  });

  const selectorStyles: CSSProperties = {
    top: `${selectorPosition.y}px`,
    left: `${selectorPosition.x}px`,
    width: `${Math.abs(selectorSize.width)}px`,
    height: `${Math.abs(selectorSize.height)}px`,
    transform: "",
  };

  if (selectorSize.width < 0) {
    selectorStyles.transform += " scaleX(-1) ";
    selectorStyles.left = `${selectorPosition.x + selectorSize.width}px`;
  }

  if (selectorSize.height < 0) {
    selectorStyles.transform += " scaleY(-1)";
    selectorStyles.top = `${selectorPosition.y + selectorSize.height}px`;
  }

  const topPos = `${selectorPosition.y - 4.5 + (selectorSize.height > 0 ? -1.5 : 1.5)}px`;
  const leftPos = `${selectorPosition.x - 4.5 + (selectorSize.width > 0 ? -1.5 : 1.5)}px`;
  const rightPos = `${selectorPosition.x + selectorSize.width - 4.5 + (selectorSize.width < 0 ? -1.5 : 1.5)}px`;
  const botPos = `${selectorPosition.y + selectorSize.height - 4.5 + (selectorSize.height < 0 ? -1.5 : 1.5)}px`;

  const midX = `${selectorPosition.x + selectorSize.width / 2 - 4.5}px`;
  const midY = `${selectorPosition.y + selectorSize.height / 2 - 4.5}px`;

  const handles = [
    {
      direction: "top-left",
      style: {
        top: topPos,
        left: leftPos,
        cursor: selectorSize.width * selectorSize.height > 0 ? "nwse-resize" : "nesw-resize",
      },
    },
    {
      direction: "top-right",
      style: {
        top: topPos,
        left: rightPos,
        cursor: selectorSize.width * selectorSize.height < 0 ? "nwse-resize" : "nesw-resize",
      },
    },
    {
      direction: "bottom-left",
      style: {
        top: botPos,
        left: leftPos,
        cursor: selectorSize.width * selectorSize.height < 0 ? "nwse-resize" : "nesw-resize",
      },
    },
    {
      direction: "bottom-right",
      style: {
        top: botPos,
        left: rightPos,
        cursor: selectorSize.width * selectorSize.height > 0 ? "nwse-resize" : "nesw-resize",
      },
    },
    {
      direction: "top",
      style: {
        top: topPos,
        left: midX,
        cursor: "ns-resize",
      },
    },
    {
      direction: "bottom",
      style: {
        top: botPos,
        left: midX,
        cursor: "ns-resize",
      },
    },
    {
      direction: "left",
      style: {
        top: midY,
        left: leftPos,
        cursor: "ew-resize",
      },
    },
    {
      direction: "right",
      style: {
        top: midY,
        left: rightPos,
        cursor: "ew-resize",
      },
    },
  ];

  const selectedObjectsId = selection.selectedSlideObjectsId!;
  const handleResize = useResize({
    selectorRef,
    containerRef,
    selectedObjectsId,
    objects,
    onUpdatePositions,
    onUpdateSizes,
  });

  const { setCurrentElement } = useAppContext();
  const handleOnClick = () => {
    setCurrentElement(null);
    let newSel: SelectionType = selection;
    newSel.selectedSlideObjectsId = [];
    dispatch(setSelectionSlide, newSel);
  };

  return (
    <>
      <div ref={selectorRef} style={selectorStyles} className={styles.selector} onClick={handleOnClick} />
      {selectedObjectsId.length === 1 && (
        <>
          {handles.map((handle) => (
            <div
              key={handle.direction}
              style={{ ...handle.style }}
              className={`${styles.handle} ${styles[handle.direction]}`}
              onMouseDown={(e) => handleResize(handle.direction, e)}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Selector;
