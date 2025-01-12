import { Gradient, Color } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateBlockBgColor = (
  editor: EditorType,
  { id, newColor }: { id: string; newColor: Color | Gradient },
): EditorType => {
  const newPres = { ...editor.presentation };

  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id) {
        return { ...element, blockBgColor: newColor };
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateBlockBgColor };
