import { Color, Gradient, Image } from "../../types/BaseTypes";
import { Presentation } from "../../types/Presentation";
import { createBgColor, createBgImage } from "../../types/Slide";
import { EditorType } from "../editorType";

const editBackground = (editor: EditorType, newBg: Image | Color | Gradient): EditorType => {
  const newPres: Presentation = editor.presentation;
  const editBgSlideIndex = editor.presentation.slideCollection.findIndex(
    (slide) => slide.id == editor.selection.selectedSlideId,
  );

  console.log(newBg);

  if ("gradientType" in (newBg as Gradient)) {
    newPres.slideCollection[editBgSlideIndex].bg = createBgColor(newBg as Gradient);
  } else if ("source" in (newBg as Image)) {
    newPres.slideCollection[editBgSlideIndex].bg = createBgImage(newBg as Image);
  } else {
    newPres.slideCollection[editBgSlideIndex].bg = createBgColor(newBg as Color);
  }

  return {
    ...editor,
    presentation: newPres,
  };
};

export { editBackground };
