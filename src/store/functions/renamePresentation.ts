import { editName } from "../../types/Presentation.ts";
import { EditorType } from "../editorType.ts";

const renamePresentation = (editor: EditorType, newTitle: string): EditorType => {
  return {
    ...editor,
    presentation: editName(newTitle, editor.presentation),
  };
};

export { renamePresentation };
