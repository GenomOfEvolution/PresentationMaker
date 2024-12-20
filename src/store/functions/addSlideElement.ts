import { Presentation } from "../../types/Presentation";
import { addElement, SlideElement } from "../../types/Slide";
import { EditorType } from "../editorType";

const addSlideElem = (editor: EditorType, newElem: SlideElement): EditorType => {
  const newPres: Presentation = editor.presentation;
  const addTextSlideIndex = editor.presentation.slideCollection.findIndex(
    (slide) => slide.id == editor.selection.selectedSlidesId![0],
  );
  newPres.slideCollection[addTextSlideIndex] = addElement(newPres.slideCollection[addTextSlideIndex], newElem);

  return {
    ...editor,
    presentation: newPres,
  };
};

export { addSlideElem };
