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
    if (typeof newBg === "string") {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgColor(newBg as Color);
    } else if ("gradientType" in newBg) {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgColor(newBg as Gradient);
    } else if ("source" in newBg) {
      newPres.slideCollection[editBgIndicies[i]].bg = createBgImage(newBg as Image);
    }
  }

  return {
    ...editor,
    presentation: newPres,
  };
};

export { editBackground };
