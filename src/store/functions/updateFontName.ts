import { ObjectType, Text } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateFontName = (editor: EditorType, { id, newFontName }: { id: string; newFontName: string }): EditorType => {
  const newPres = { ...editor.presentation };
  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id && element.objectType === ObjectType.Text) {
        let elemAsText = element as Text;

        elemAsText.fontName = newFontName;
        return elemAsText;
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateFontName };
