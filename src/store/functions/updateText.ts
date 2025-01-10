import { Text } from "../../types/BaseTypes";
import { EditorType } from "../editorType";

const updateText = (editor: EditorType, { id, text }: { id: string; text: string }): EditorType => {
  const newPres = { ...editor.presentation };

  newPres.slideCollection = newPres.slideCollection.map((slide) => {
    const newElements = slide.elements.map((element) => {
      if (element.id === id) {
        console.log("FOUND", element, text);
        let elemAsText = element as Text;
        elemAsText.content = text;

        return elemAsText;
      }
      return element;
    });
    return { ...slide, elements: newElements };
  });

  return { ...editor, presentation: newPres };
};

export { updateText };
