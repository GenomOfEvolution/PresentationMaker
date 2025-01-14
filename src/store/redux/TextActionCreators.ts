import { Color } from "../../types/BaseTypes";
import { ActionType } from "./Actions";

const updateFontBgColor = (id: string, newColor: Color) => {
  return {
    type: ActionType.Update_Font_Bg_Color,
    payload: { id, newColor },
  };
};

const updateFontColor = (id: string, newColor: Color) => {
  return {
    type: ActionType.Update_Font_Color,
    payload: { id, newColor },
  };
};

const updateFontName = (id: string, newFontName: string) => {
  return {
    type: ActionType.Update_Font_Name,
    payload: { id, newFontName },
  };
};

const updateFontSize = (id: string, newFontSize: number) => {
  return {
    type: ActionType.Update_Font_Size,
    payload: { id, newFontSize },
  };
};

const updateText = (id: string, text: string) => {
  return {
    type: ActionType.Update_Text,
    payload: { id, text },
  };
};

const renamePresentation = (newName: string) => {
  return {
    type: ActionType.Rename_Presentation,
    payload: newName,
  };
};

export { updateFontBgColor, updateFontColor, updateFontName, updateFontSize, updateText, renamePresentation };
