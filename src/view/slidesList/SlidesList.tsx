import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "./SlidesList.module.css";
import { SelectionType } from "../../types/Selection.ts";
// import { dispatch } from "../store/editor.ts";
// import { setSelection } from "../store/setSelection.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListPros = {
  slides: Array<SlideType>;
  selection: SelectionType;
};

const SlidesList = ({ slides, selection }: SlidesListPros) => {
  /*function onSlideClick(slideId: string) {
    dispatch(setSelection, {
      selectedSlideId: slideId,
    });
  }*/
  return (
    <div className={styles.slideList}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <Slide
            slide={slide}
            scale={SLIDE_PREVIEW_SCALE}
            isSelected={slide.id === selection.selectedElementId}
            className={styles.item}
          ></Slide>
        </div>
      ))}
    </div>
  );
};

export { SlidesList };
