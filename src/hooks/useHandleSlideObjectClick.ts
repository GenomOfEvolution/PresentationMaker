import { SelectionType } from "../types/Selection";
import { dispatch } from "../store/editor";
import { setSelectionSlide } from "../store/functions/setSelectionSlide";
import { SlideObject } from "../types/BaseTypes";
import { useCallback } from "react";

const useHandleSlideObjectClick = (slideObject: SlideObject, selection: SelectionType) => {
  const handleSlideObjectClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const newSel = { ...selection };
      if (event.ctrlKey || event.shiftKey) {
        if (!newSel.selectedSlideObjectsId?.includes(slideObject.id)) {
          newSel.selectedSlideObjectsId = [...(newSel.selectedSlideObjectsId || []), slideObject.id];
        } else {
          newSel.selectedSlideObjectsId = newSel.selectedSlideObjectsId?.filter((id) => id !== slideObject.id);
        }
      } else {
        newSel.selectedSlideObjectsId = [slideObject.id];
      }

      newSel.selectedSlidesId = newSel.selectedSlidesId || [newSel.selectedSlidesId![0]];
      dispatch(setSelectionSlide, newSel);
    },
    [slideObject, selection],
  );

  return handleSlideObjectClick;
};

export default useHandleSlideObjectClick;
