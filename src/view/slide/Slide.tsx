import { SlideType, BackgroundType } from "../../types/Slide.ts";
import { Color, Gradient, gradientToCss, ObjectType } from "../../types/BaseTypes.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from "../slide/Slide.module.css";
import { CSSProperties } from "react";
import { SelectionType } from "../../types/Selection.ts";
import Selector from "../../components/selector/selector.tsx";
import useHandleSlideObjectClick from "../../hooks/useHandleSlideObjectClick.ts";

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
  const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${(SLIDE_WIDTH / ASPECT_RATIO) * scale}px`,
  };

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

  return (
    <>
      <div style={slideStyles} className={styles.slide + " " + className} id={slide.id}>
        {slide.elements.map((slideObject) => {
          const handleSlideObjectClick = useHandleSlideObjectClick(slideObject, selection);

          switch (slideObject.objectType) {
            case ObjectType.Text:
              return (
                <TextObject
                  key={slideObject.id}
                  textObject={slideObject}
                  scale={scale}
                  onSelect={(event) => handleSlideObjectClick(event)}
                />
              );
            case ObjectType.Image:
              return (
                <ImageObject
                  key={slideObject.id}
                  imageObject={slideObject}
                  scale={scale}
                  onSelect={(event) => handleSlideObjectClick(event)}
                />
              );
            default:
              throw new Error(`Unknown slide type`);
          }
        })}
      </div>
      {selection.selectedSlideObjectsId!.length > 0 && (
        <Selector
          selectedObjectsId={selection.selectedSlideObjectsId}
          objects={slide.elements}
          containerRef={containerRef}
        />
      )}
    </>
  );
};

export { Slide };
