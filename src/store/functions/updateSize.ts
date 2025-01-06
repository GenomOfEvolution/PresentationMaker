import { Size } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateSize = (editor: EditorType, { id, size }: { id: string; size: Size }): EditorType => {
  const newPres = { ...editor.presentation };

  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id) {
        return { ...element, size };
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateSize };
