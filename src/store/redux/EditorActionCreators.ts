import { SelectionType } from "../../types/Selection";
import { EditorType } from "../editorType";
import { ActionType } from "./Actions";

const setEditor = (newEditor: EditorType) => {
  return {
    type: ActionType.Set_Editor,
    payload: newEditor,
  };
};

const setSelectionSlide = (selection: SelectionType) => {
  return {
    type: ActionType.Set_Selection_Slide,
    payload: selection,
  };
};

export { setEditor, setSelectionSlide };
