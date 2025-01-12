import { Color, ObjectType, Text } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateFontBgColor = (editor: EditorType, { id, newColor }: { id: string; newColor: Color }): EditorType => {
  const newPres = { ...editor.presentation };

  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id && element.objectType === ObjectType.Text) {
        let elemAsText = element as Text;
        elemAsText.fontBgColor = newColor;
        return elemAsText;
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateFontBgColor };
