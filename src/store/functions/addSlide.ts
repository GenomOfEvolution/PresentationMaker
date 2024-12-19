import { SelectionType } from "../../types/Selection";
import { createSlide, SlideType } from "../../types/Slide";
import { addSlide } from "../../types/SlideCollection";
import { EditorType } from "../editorType";

const addNewSlide = (editor: EditorType): EditorType => {
  const newSlide: SlideType = createSlide();
  let curSelection: SelectionType = editor.selection;

  if (editor.presentation.slideCollection.length === 0) {
    curSelection.selectedSlideId = newSlide.id;
  }

  return {
    ...editor,
    selection: curSelection,
    presentation: addSlide(editor.presentation, newSlide),
  };
};

export { addNewSlide };
