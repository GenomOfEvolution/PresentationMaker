import { createPresentation } from "../../types/Presentation";
import { createSelection } from "../../types/Selection";
import { EditorType } from "../editorType";
import { addNewSlide } from "../functions/addSlide";
import { addSlideElem } from "../functions/addSlideElement";
import { editBackground } from "../functions/editBackground";
import { removeSlide } from "../functions/removeSlide";
import { removeSlideElem } from "../functions/removeSlideElement";
import { renamePresentation } from "../functions/renamePresentation";
import { setSelectionSlide } from "../functions/setSelectionSlide";
import { updateBlockBgColor } from "../functions/updateBlockBgColor";
import { updateBlockBorderColor } from "../functions/updateBlockBorderColor";
import { updateFontBgColor } from "../functions/updateFontBgColor";
import { updateFontColor } from "../functions/updateFontColor";
import { updateFontName } from "../functions/updateFontName";
import { updateFontSize } from "../functions/updateFontSize";
import { updatePosition } from "../functions/updatePosition";
import { updateSize } from "../functions/updateSize";
import { updateText } from "../functions/updateText";
import { ActionType, EditorAction } from "./Actions";

const initialState: EditorType = {
  presentation: createPresentation(),
  workingWith: "slideList",
  selection: createSelection(),
};

const EditorReducer = (editor: EditorType = initialState, action: EditorAction): EditorType => {
  switch (action.type) {
    case ActionType.Add_Slide:
      return addNewSlide(editor);
    case ActionType.Add_Slide_Element:
      return addSlideElem(editor, action.payload);
    case ActionType.Edit_Background:
      return editBackground(editor, action.payload);
    case ActionType.Remove_Slide:
      return removeSlide(editor, action.payload);
    case ActionType.Remove_Slide_Element:
      return removeSlideElem(editor, action.payload);
    case ActionType.Rename_Presentation:
      return renamePresentation(editor, action.payload);
    case ActionType.Set_Editor:
      return action.payload;
    case ActionType.Set_Selection_Slide:
      return setSelectionSlide(editor, action.payload);
    case ActionType.Update_Block_Bg_Color:
      return updateBlockBgColor(editor, action.payload);
    case ActionType.Update_Block_Border_Color:
      return updateBlockBorderColor(editor, action.payload);
    case ActionType.Update_Font_Bg_Color:
      return updateFontBgColor(editor, action.payload);
    case ActionType.Update_Font_Color:
      return updateFontColor(editor, action.payload);
    case ActionType.Update_Font_Name:
      return updateFontName(editor, action.payload);
    case ActionType.Update_Font_Size:
      return updateFontSize(editor, action.payload);
    case ActionType.Update_Position:
      return updatePosition(editor, action.payload);
    case ActionType.Update_Size:
      return updateSize(editor, action.payload);
    case ActionType.Update_Text:
      return updateText(editor, action.payload);
    default:
      return editor;
  }
};

export default EditorReducer;
