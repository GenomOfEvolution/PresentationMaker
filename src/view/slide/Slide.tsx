import { SlideType, BackgroundType } from "../../types/Slide.ts";
import { Color, Gradient, gradientToCss, ObjectType, Point, Size } from "../../types/BaseTypes.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from "../slide/Slide.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { SelectionType } from "../../types/Selection.ts";
import Selector from "../../components/selector/selector.tsx";
import { useAppContext } from "../../contexts/appContext/AppContextProvider.tsx";
import { useAppActions } from "../../hooks/useAppActions.ts";

const ASPECT_RATIO: number = 1000 / 562.5;

const SLIDE_WIDTH = 1000;

type SlideProps = {
  slide: SlideType;
  scale?: number;
  className: string;
  containerRef: any;
  selection: SelectionType;
};

const Slide = ({ containerRef, slide, scale = 1, className, selection }: SlideProps) => {
  const { updatePosition, updateSize, setSelectionSlide } = useAppActions();
  const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${(SLIDE_WIDTH / ASPECT_RATIO) * scale}px`,
  };
  const [positions, setPositions] = useState<{ [id: string]: Point }>({});
  const [sizes, setSizes] = useState<{ [id: string]: Size }>({});

  switch (slide.bg.type) {
    case BackgroundType.Image:
      slideStyles.backgroundImage = `url(${slide.bg.url})`;
      slideStyles.backgroundSize = "cover";
      slideStyles.backgroundPosition = "center";
      slideStyles.backgroundRepeat = "no-repeat";
      break;
    case BackgroundType.Color:
      if ((slide.bg.color as Gradient).gradientType !== undefined) {
        slideStyles.backgroundImage = gradientToCss(slide.bg.color as Gradient);
      } else {
        slideStyles.backgroundColor = slide.bg.color as Color;
      }
      break;
  }

  const { setCurrentElement } = useAppContext();
  useEffect(() => {
    if (Object.keys(positions).length > 0) {
      Object.keys(positions).forEach((id) => {
        updatePosition(id, positions[id]);
      });
    }

    if (Object.keys(sizes).length > 0) {
      Object.keys(sizes).forEach((id) => {
        updateSize(id, sizes[id]);
      });
    }
  }, [positions, sizes]);

  const handleContainerClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setSelectionSlide({
        ...selection,
        selectedSlideObjectsId: [],
      });
      setCurrentElement(null);
    }
  };

  const slideRef = useRef(null);

  return (
    <>
      <div
        style={slideStyles}
        className={styles.slide + " " + className}
        id={slide.id}
        onMouseDown={handleContainerClick}
        ref={slideRef}
      >
        {slide.elements.map((slideObject) => {
          switch (slideObject.objectType) {
            case ObjectType.Text:
              return <TextObject key={slideObject.id} textObject={slideObject} scale={scale} selection={selection} />;
            case ObjectType.Image:
              return <ImageObject key={slideObject.id} imageObject={slideObject} scale={scale} selection={selection} />;
            default:
              throw new Error(`Unknown slide type`);
          }
        })}
      </div>
      {selection.selectedSlideObjectsId!.length > 0 && (
        <Selector
          selection={selection}
          objects={slide.elements}
          containerRef={containerRef}
          slideRef={slideRef}
          onUpdatePositions={setPositions}
          onUpdateSizes={setSizes}
        />
      )}
    </>
  );
};

export { Slide };
