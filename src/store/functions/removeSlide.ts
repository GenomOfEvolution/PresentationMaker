import { Presentation } from "../../types/Presentation";
import { SelectionType } from "../../types/Selection";
import { SlideType } from "../../types/Slide";
import { removeSlides } from "../../types/SlideCollection";
import { EditorType } from "../editorType";

const removeSlide = (editor: EditorType, slidesToRemove: string[] | SlideType[]): EditorType => {
  if (editor.presentation.slideCollection.length === 0) {
    return { ...editor };
  }

  let idsToRemove: string[] = [];

  if (typeof slidesToRemove[0] == "string") {
    idsToRemove = [...(slidesToRemove as string[])];
  } else {
    for (let i = 0; i < slidesToRemove.length; i++) {
      idsToRemove.push((slidesToRemove[i] as SlideType).id);
    }
  }

  let newSel: SelectionType = editor.selection;
  newSel.selectedSlideObjectsId = [];
  let firstToDeleteIndex: number = 0;

  // ищем на какой слайд встать после удаления
  for (let i = 0; i <= editor.presentation.slideCollection.length; i++) {
    if (editor.presentation.slideCollection[i].id === idsToRemove[0]) {
      firstToDeleteIndex = i;
      break;
    }
  }

  if (firstToDeleteIndex >= editor.presentation.slideCollection.length - idsToRemove.length) {
    firstToDeleteIndex--;
  }

  const newPres: Presentation = removeSlides(idsToRemove, editor.presentation);

  // Слайдов нет в презентации
  if (firstToDeleteIndex === -1) {
    firstToDeleteIndex = 0;
    newSel.selectedSlidesId = null;
  } else {
    newSel.selectedSlidesId = [newPres.slideCollection[firstToDeleteIndex].id];
  }

  return {
    ...editor,
    presentation: newPres,
    selection: newSel,
  };
};

export { removeSlide };
