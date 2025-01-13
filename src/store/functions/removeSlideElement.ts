import { Presentation } from "../../types/Presentation";
import { SelectionType } from "../../types/Selection";
import { SlideElement } from "../../types/Slide";
import { EditorType } from "../editorType";

const removeSlideElem = (editor: EditorType, selection: SelectionType): EditorType => {
  const newPres: Presentation = { ...editor.presentation };

  const addTextSlideIndex = editor.presentation.slideCollection.findIndex(
    (slide) => slide.id === editor.selection.selectedSlidesId![0],
  );

  if (addTextSlideIndex !== -1) {
    const slide = newPres.slideCollection[addTextSlideIndex];
    const idsToRemove = selection.selectedSlideObjectsId!;

    const updatedElements = slide.elements.filter((elem: SlideElement) => !idsToRemove.includes(elem.id));

    newPres.slideCollection[addTextSlideIndex] = {
      ...slide,
      elements: updatedElements,
    };
  }

  return {
    ...editor,
    presentation: newPres,
  };
};

export { removeSlideElem };
