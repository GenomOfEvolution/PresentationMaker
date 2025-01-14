import { Color, Gradient, Image, Point, Size } from "../../types/BaseTypes";
import { SelectionType } from "../../types/Selection";
import { SlideElement, SlideType } from "../../types/Slide";
import { EditorType } from "../editorType";

export enum ActionType {
  Add_Slide = "addNewSlide",
  Add_Slide_Element = "addSlideElem",
  Edit_Background = "editBackground",
  Remove_Slide = "removeSlide",
  Remove_Slide_Element = "removeSlideElem",
  Rename_Presentation = "renamePresentation",
  Set_Editor = "setEditor",
  Set_Selection_Slide = "setSelectionSlide",
  Update_Block_Bg_Color = "updateBlockBgColor",
  Update_Block_Border_Color = "updateBlockBorderColor",
  Update_Font_Bg_Color = "updateFontBgColor",
  Update_Font_Color = "updateFontColor",
  Update_Font_Name = "updateFontName",
  Update_Font_Size = "updateFontSize",
  Update_Position = "updatePosition",
  Update_Size = "updateSize",
  Update_Text = "updateText",
}

type AddSlideAction = {
  type: ActionType.Add_Slide;
};

type AddSlideElement = {
  type: ActionType.Add_Slide_Element;
  payload: SlideElement;
};

type EditBackgroundAction = {
  type: ActionType.Edit_Background;
  payload: Image | Color | Gradient;
};

type RemoveSlideAction = {
  type: ActionType.Remove_Slide;
  payload: string[] | SlideType[];
};

type RemoveSlideElementAction = {
  type: ActionType.Remove_Slide_Element;
  payload: SelectionType;
};

type RenamePresentationAction = {
  type: ActionType.Rename_Presentation;
  payload: string;
};

type SetSelectionSlideAction = {
  type: ActionType.Set_Selection_Slide;
  payload: SelectionType;
};

type UpdateBlockBgColorAction = {
  type: ActionType.Update_Block_Bg_Color;
  payload: { id: string; newColor: Color | Gradient };
};

type UpdateBlockBorderColorAction = {
  type: ActionType.Update_Block_Border_Color;
  payload: { id: string; newColor: Color | Gradient };
};

type UpdateFontBgColorAction = {
  type: ActionType.Update_Font_Bg_Color;
  payload: { id: string; newColor: Color };
};
type UpdateFontColorAction = {
  type: ActionType.Update_Font_Color;
  payload: { id: string; newColor: Color };
};
type UpdateFontNameAction = {
  type: ActionType.Update_Font_Name;
  payload: { id: string; newFontName: string };
};
type UpdateFontSizeAction = {
  type: ActionType.Update_Font_Size;
  payload: { id: string; newFontSize: number };
};
type UpdatePositionAction = {
  type: ActionType.Update_Position;
  payload: { id: string; pos: Point };
};
type UpdateSizeAction = {
  type: ActionType.Update_Size;
  payload: { id: string; size: Size };
};
type UpdateTextAction = {
  type: ActionType.Update_Text;
  payload: { id: string; text: string };
};

type SetEditorAction = {
  type: ActionType.Set_Editor;
  payload: EditorType;
};

export type EditorAction =
  | AddSlideAction
  | AddSlideElement
  | EditBackgroundAction
  | RemoveSlideAction
  | RemoveSlideElementAction
  | RenamePresentationAction
  | SetSelectionSlideAction
  | UpdateBlockBgColorAction
  | UpdateBlockBorderColorAction
  | UpdateFontBgColorAction
  | UpdateFontColorAction
  | UpdateFontNameAction
  | UpdateFontSizeAction
  | UpdatePositionAction
  | UpdateSizeAction
  | UpdateTextAction
  | SetEditorAction;
