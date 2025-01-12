import { ObjectType, Text } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateFontSize = (editor: EditorType, { id, newFontSize }: { id: string; newFontSize: number }): EditorType => {
  const newPres = { ...editor.presentation };
  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id && element.objectType === ObjectType.Text) {
        let elemAsText = element as Text;

        elemAsText.fontSize = newFontSize;
        return elemAsText;
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateFontSize };
