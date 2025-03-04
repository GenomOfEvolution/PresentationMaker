import { SelectionType } from "../types/Selection";
import { SlideObject } from "../types/BaseTypes";
import { useCallback } from "react";
import { useAppActions } from "./useAppActions";

const useHandleSlideObjectClick = (slideObject: SlideObject, selection: SelectionType) => {
  const { setSelectionSlide } = useAppActions();
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
      setSelectionSlide(newSel);
    },
    [slideObject, selection],
  );

  return handleSlideObjectClick;
};

export default useHandleSlideObjectClick;
