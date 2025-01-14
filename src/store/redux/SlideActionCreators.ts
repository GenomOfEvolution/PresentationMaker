import { SelectionType } from "../../types/Selection";
import { SlideElement, SlideType } from "../../types/Slide";
import { ActionType } from "./Actions";

const addNewSlide = () => {
  return {
    type: ActionType.Add_Slide,
  };
};

const addSlideElem = (element: SlideElement) => {
  return {
    type: ActionType.Add_Slide_Element,
    payload: element,
  };
};

const removeSlide = (slides: string[] | SlideType[]) => {
  return {
    type: ActionType.Remove_Slide,
    payload: slides,
  };
};

const removeSlideElem = (selection: SelectionType) => {
  return {
    type: ActionType.Remove_Slide_Element,
    payload: selection,
  };
};

export { addNewSlide, addSlideElem, removeSlide, removeSlideElem };
