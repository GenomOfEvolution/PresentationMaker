import { Color, Gradient, gradientToCss, ObjectType } from "../../types/BaseTypes";
import { BackgroundType, SlideType } from "../../types/Slide";
import styles from "./slidePreview.module.css";
import itemStyles from "../../view/slidesList/SlidesList.module.css";
import { CSSProperties } from "react";
import { ImageObjectPreview } from "./imageObjectPreview";
import { TextObjectPreview } from "./textObjectPreview";

export type SlidePreviewProps = {
  slide: SlideType;
  scale: number;
  isSelected: boolean;
};

const SlidePreview = ({ slide, scale, isSelected }: SlidePreviewProps) => {
  const slideStyles: CSSProperties = {};

  if (isSelected) {
    slideStyles.boxShadow = "0 0 0 3px #0b57d0";
  }

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

  /*
  slide.elements.map((slideObject) => {
          switch (slideObject.objectType) {
            case ObjectType.Text:
              return (
                <div></div>
              );
            case ObjectType.Image:
              return (
                <ImageObjectPreview
                  key={slideObject.id}
                  imageObject={slideObject}
                  scale={scale}
                  />
              );
            default:
              throw new Error(`Unknown slide type`);
          }
        }
  
  */

  return (
    <div className={styles.slidePreview + " " + itemStyles.item} style={slideStyles}>
      {slide.elements.map((slideObject) => {
        switch (slideObject.objectType) {
          case ObjectType.Text:
            return <TextObjectPreview key={slideObject.id} textObject={slideObject} scale={scale} />;
          case ObjectType.Image:
            return <ImageObjectPreview key={slideObject.id} imageObject={slideObject} scale={scale} />;
          default:
            throw new Error(`Unknown slide type`);
        }
      })}
    </div>
  );
};

export { SlidePreview };
