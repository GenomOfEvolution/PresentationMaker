import { SelectionType } from "../../types/Selection";
import { createSlide, SlideType } from "../../types/Slide";
import { addSlide, moveSlides } from "../../types/SlideCollection";
import { EditorType } from "../editorType";

const addNewSlide = (editor: EditorType): EditorType => {
  console.log("addNewSlide");
  const newSlide: SlideType = createSlide();
  let curSelection: SelectionType = editor.selection;

  const indexToInsert: number =
    1 +
    editor.presentation.slideCollection.findIndex(
      (slide) => slide.id === curSelection.selectedSlidesId![curSelection.selectedSlidesId!.length - 1],
    );

  if (editor.presentation.slideCollection.length === 0) {
    curSelection.selectedSlidesId = [newSlide.id];
    return {
      ...editor,
      selection: curSelection,
      presentation: addSlide(editor.presentation, newSlide),
    };
  } else {
    return {
      ...editor,
      selection: curSelection,
      presentation: moveSlides([newSlide.id], addSlide(editor.presentation, newSlide), indexToInsert),
    };
  }
};

export { addNewSlide };
