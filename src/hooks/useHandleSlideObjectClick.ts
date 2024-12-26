import { SelectionType } from "../types/Selection";
import { dispatch } from "../store/editor";
import { setSelectionSlide } from "../store/functions/setSelectionSlide";
import { SlideObject } from "../types/BaseTypes";

const useHandleSlideObjectClick = (slideObject: SlideObject) => {
  const handleSlideObjectClick = (selection: SelectionType, event: React.MouseEvent) => {
    const newSel = selection;

    if (event.ctrlKey || event.shiftKey) {
      if (!newSel.selectedSlideObjectsId?.includes(slideObject.id)) {
        newSel.selectedSlideObjectsId!.push(slideObject.id);
      } else if (newSel.selectedSlideObjectsId?.includes(slideObject.id)) {
        newSel.selectedSlideObjectsId! = newSel.selectedSlideObjectsId?.filter((id) => id !== slideObject.id);
      }
    } else {
      newSel.selectedSlideObjectsId! = [slideObject.id];
    }

    newSel.selectedSlidesId = [newSel.selectedSlidesId![0]];
    dispatch(setSelectionSlide, newSel);
  };

  return handleSlideObjectClick;
};

export default useHandleSlideObjectClick;
