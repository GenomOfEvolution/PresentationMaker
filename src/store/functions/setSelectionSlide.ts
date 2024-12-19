import { SelectionType } from "../../types/Selection.ts";
import { EditorType } from "../editorType.ts";

const setSelectionSlide = (editor: EditorType, newSelection: SelectionType): EditorType => {
  return {
    ...editor,
    selection: newSelection,
  };
};

export { setSelectionSlide };
