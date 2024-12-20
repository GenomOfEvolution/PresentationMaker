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
  const onSlideClick = (slideId: string, selection: SelectionType, event) => {
    const curSel: SelectionType = selection;
    if (event.ctrlKey) {
      if (!curSel.selectedSlidesId?.includes(slideId) && curSel.selectedSlidesId!.length >= 1) {
        curSel.selectedSlidesId!.push(slideId);
      } else if (curSel.selectedSlidesId?.includes(slideId) && curSel.selectedSlidesId?.length > 1) {
        curSel.selectedSlidesId! = curSel.selectedSlidesId?.filter((id) => id !== slideId);
      }
    } else if (event.shiftKey) {
      const fromId = selection.selectedSlidesId![selection.selectedSlidesId!.length - 1];
      const fromIndex = slides.findIndex((slide) => slide.id === fromId);
      const toIndex = slides.findIndex((slide) => slide.id === slideId);

      let minIndex = fromIndex < toIndex ? fromIndex : toIndex;
      let maxIndex = fromIndex > toIndex ? fromIndex : toIndex;

      if (minIndex < 0) {
        minIndex = 0;
      }

      if (curSel.selectedSlidesId!.length > 1 && fromIndex > toIndex) {
        maxIndex = slides.findIndex((slide) => slide.id === curSel.selectedSlidesId![0]);
      }

      let indexArr: number[] = [];
      for (let i = minIndex; i <= maxIndex; i++) {
        indexArr.push(i);
      }

      curSel.selectedSlidesId = indexArr.map((index) => slides[index].id);
    } else {
      curSel.selectedSlidesId = [slideId];
    }
    dispatch(setSelectionSlide, curSel);
  };

  return (
    <div className={styles.slideList}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={styles.item__wrapper}
          onClick={(event) => onSlideClick(slide.id, selection, event)}
        >
          <span className={styles.item__number}>{index + 1}</span>
          <Slide
            slide={slide}
            scale={SLIDE_PREVIEW_SCALE}
            isSelected={(selection.selectedSlidesId as string[]).includes(slide.id)}
            className={styles.item}
          />
        </div>
      ))}
    </div>
  );
};

export { SlidesList };
