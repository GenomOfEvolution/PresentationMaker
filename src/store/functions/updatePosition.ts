import { Point } from "../../types/BaseTypes";
import { Presentation } from "../../types/Presentation";
import { EditorType } from "../editorType";

const updatePosition = (editor: EditorType, { id, pos }: { id: string; pos: Point }): EditorType => {
  const newPres = { ...editor.presentation };

  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id) {
        return { ...element, pos };
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updatePosition };
