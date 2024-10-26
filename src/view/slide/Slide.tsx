import { SlideType, BackgroundType } from "../../types/Slide.ts";
import { Color, Gradient, gradientToCss, ObjectType } from "../../types/BaseTypes.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import { styles } from "./Slide.module.css";
import { CSSProperties } from "react";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
  slide: SlideType;
  scale?: number;
  isSelected: boolean;
  className: string;
};

const Slide = ({ slide, scale = 1, isSelected, className }: SlideProps) => {
  const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`,
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

  if (isSelected) {
    slideStyles.border = "3px solid #0b57d0";
  }

  return (
    <>
      <div style={slideStyles} className={styles.slide + " " + className}>
        {slide.elements.map((slideObject) => {
          switch (slideObject.objectType) {
            case ObjectType.Text:
              return <TextObject key={slideObject.id} textObject={slideObject} scale={scale}></TextObject>;
            case ObjectType.Image:
              return <ImageObject key={slideObject.id} imageObject={slideObject} scale={scale}></ImageObject>;
            default:
              throw new Error(`Unknown slide type: ${slideObject.objectType}`);
          }
        })}
      </div>
    </>
  );
};

export { Slide };
