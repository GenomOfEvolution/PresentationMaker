import { Id, Text, Image, Color, Gradient, Point, Size } from "./BaseTypes";
import { v4 as uuidv4 } from "uuid";

export enum BackgroundType {
  Image,
  Color,
}

type BackgroundImg = {
  type: BackgroundType.Image;
  url: string;
};

type BackgroundColor = {
  type: BackgroundType.Color;
  color: Color | Gradient;
};

export type SlideBackground = BackgroundImg | BackgroundColor;
export type SlideElement = Text | Image;

export type Slide = {
  id: Id;
  elements: SlideElement[];
  bg: SlideBackground;
};

const createSlide = (): Slide => ({
  id: uuidv4(),
  elements: [],
  bg: { type: BackgroundType.Color, color: "#000000" },
});

const editBackground = (slide: Slide, newBg: SlideBackground): Slide => ({
  ...slide,
  bg: newBg,
});

const addElement = (slide: Slide, newElem: SlideElement): Slide => ({
  ...slide,
  elements: [...slide.elements, newElem],
});

const editTextContent = (textElem: Text, newText: string): Text => ({
  ...textElem,
  content: newText,
});

const editTextFont = (textElem: Text, newFont: string): Text => ({
  ...textElem,
  fontName: newFont,
});

const editTextFontSize = (textElem: Text, newFontSize: number): Text => {
  if (newFontSize <= 0) {
    return { ...textElem };
  }

  return { ...textElem, fontSize: newFontSize };
};

const editElementPosition = (newPos: Point, elem: SlideElement): SlideElement => ({
  ...elem,
  pos: newPos,
});

const editElementSize = (newSize: Size, elem: SlideElement): SlideElement => ({
  ...elem,
  size: newSize,
});

const getElemIndexById = (slide: Slide, elemId: Id): number => {
  return slide.elements.findIndex((item) => item.id === elemId);
};

const removeElementsById = (slide: Slide, ids: Id[]): Slide => {
  const filteredElements = slide.elements.filter((slide) => !ids.includes(slide.id));
  return {
    ...slide,
    elements: filteredElements,
  };
};

export {
  createSlide,
  editBackground,
  addElement,
  removeElementsById,
  editTextContent,
  editTextFont,
  editTextFontSize,
  editElementPosition,
  editElementSize,
  getElemIndexById,
};
