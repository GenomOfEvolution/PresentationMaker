import { Color, Gradient, Image } from "../../types/BaseTypes";
import { Presentation } from "../../types/Presentation";
import { createBgColor, createBgImage } from "../../types/Slide";
import { EditorType } from "../editorType";

const editBackground = (editor: EditorType, newBg: Image | Color | Gradient): EditorType => {
  const newPres: Presentation = editor.presentation;
  const editBgIndicies = editor.selection.selectedSlidesId!.map((id) =>
    editor.presentation.slideCollection.findIndex((slide) => slide.id === id),
  );

  for (let i = 0; i < editBgIndicies.length; i++) {
    if ("gradientType" in (newBg as Gradient)) {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgColor(newBg as Gradient);
    } else if ("source" in (newBg as Image)) {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgImage(newBg as Image);
    } else {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgColor(newBg as Color);
    }
  }

  return {
    ...editor,
    presentation: newPres,
  };
};

export { editBackground };
