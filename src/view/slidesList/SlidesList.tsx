import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import { SelectionType } from "../../types/Selection.ts";
import styles from "./SlidesList.module.css";
import { dispatch } from "../../store/editor.ts";
import { setSelectionSlide } from "../../store/functions/setSelectionSlide.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListPros = {
  slides: Array<SlideType>;
  selection: SelectionType;
};

const SlidesList = ({ slides, selection }: SlidesListPros) => {
  const onSlideClick = (slideId: String) => {
    dispatch(setSelectionSlide, {
      selectedSlideId: slideId,
    });
  };

  return (
    <div className={styles.slideList}>
      {slides.map((slide, index) => (
        <div key={slide.id} className={styles.item__wrapper} onClick={() => onSlideClick(slide.id)}>
          <span className={styles.item__number}>{index + 1}</span>
          <Slide
            slide={slide}
            scale={SLIDE_PREVIEW_SCALE}
            isSelected={slide.id === selection.selectedSlideId}
            className={styles.item}
          />
        </div>
      ))}
    </div>
  );
};

export { SlidesList };
