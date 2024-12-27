import { useCallback } from "react";
import { dispatch, getEditor } from "../store/editor.ts";
import { setSelectionSlide } from "../store/functions/setSelectionSlide.ts";
import { SelectionType } from "../types/Selection.ts";
import { SlideType } from "../types/Slide.ts";

const useSlideClick = (slides: SlideType[], selection: SelectionType) => {
  const onSlideClick = useCallback(
    (slideId: string, selection: SelectionType, event) => {
      const curSel: SelectionType = selection;
      curSel.selectedSlideObjectsId = [];

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

        if (maxIndex >= slides.length) {
          maxIndex = slides.length - 1;
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
    },
    [slides, selection],
  );

  return onSlideClick;
};

export default useSlideClick;
