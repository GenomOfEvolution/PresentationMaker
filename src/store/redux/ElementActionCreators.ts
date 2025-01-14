import { Image, Color, Gradient, Point, Size } from "../../types/BaseTypes";
import { ActionType } from "./Actions";

const editBackground = (background: Image | Color | Gradient) => {
  return {
    type: ActionType.Edit_Background,
    payload: background,
  };
};

const updateBlockBgColor = (id: string, color: Color | Gradient) => {
  return {
    type: ActionType.Update_Block_Bg_Color,
    payload: { id, color },
  };
};

const updateBlockBorderColor = (id: string, color: Color | Gradient) => {
  return {
    type: ActionType.Update_Block_Border_Color,
    payload: { id, color },
  };
};

const updatePosition = (id: string, pos: Point) => {
  return {
    type: ActionType.Update_Position,
    payload: { id, pos },
  };
};

const updateSize = (id: string, size: Size) => {
  return {
    type: ActionType.Update_Size,
    payload: { id, size },
  };
};

export { editBackground, updateBlockBgColor, updateBlockBorderColor, updatePosition, updateSize };
