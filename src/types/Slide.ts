import {
  Id,
  Text,
  Image,
  Color,
  Gradient,
  Point,
  Size,
  ObjectType,
  createSlideObject,
  SlideObject,
  FontFormatting,
} from "./BaseTypes";
import { v4 as uuidv4 } from "uuid";

export enum BackgroundType {
  Image,
  Color,
}

export type BackgroundImg = {
  type: BackgroundType.Image;
  url: string;
};

export type BackgroundColor = {
  type: BackgroundType.Color;
  color: Color | Gradient;
};

export type SlideBackground = BackgroundImg | BackgroundColor;
export type SlideElement = Text | Image;

const createSlideElement = (
  pos: Point,
  size: Size,
  elemType: ObjectType
): SlideElement => {
  const baseElem: SlideObject = createSlideObject(pos, size);

  switch (elemType) {
    case ObjectType.Text:
      return {
        ...baseElem,
        objectType: ObjectType.Text,
        fontSize: 14,
        fontName: "Arial",
        fontFormatting: FontFormatting.none,
        fontColor: "Black",
        fontBgColor: "transperent",
        content: null,
      };
    case ObjectType.Image:
      return {
        ...baseElem,
        objectType: ObjectType.Image,
        url: "",
        source: "URL",
      };
  }
};

export type SlideType = {
  id: Id;
  elements: SlideElement[];
  bg: SlideBackground;
};

const createSlide = (): SlideType => ({
  id: uuidv4(),
  elements: [],
  bg: { type: BackgroundType.Color, color: "#ffffff" },
});

const editBackground = (
  slide: SlideType,
  newBg: SlideBackground
): SlideType => ({
  ...slide,
  bg: newBg,
});

const addElement = (slide: SlideType, newElem: SlideElement): SlideType => ({
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

const editElementPosition = (
  newPos: Point,
  elem: SlideElement
): SlideElement => ({
  ...elem,
  pos: newPos,
});

const editElementSize = (newSize: Size, elem: SlideElement): SlideElement => ({
  ...elem,
  size: newSize,
});

const getElemIndexById = (slide: SlideType, elemId: Id): number => {
  return slide.elements.findIndex((item) => item.id === elemId);
};

const removeElementsById = (slide: SlideType, ids: Id[]): SlideType => {
  const filteredElements = slide.elements.filter(
    (slide) => !ids.includes(slide.id)
  );
  return {
    ...slide,
    elements: filteredElements,
  };
};

const moveElementsDown = (
  elementsToMoveId: Id[],
  slide: SlideType
): SlideType => {
  let elementsCopy = [...slide.elements];
  elementsToMoveId
    .slice()
    .reverse()
    .forEach((id) => {
      const index = elementsCopy.findIndex((element) => element.id === id);
      if (index !== -1 && index < elementsCopy.length - 1) {
        [elementsCopy[index], elementsCopy[index + 1]] = [
          elementsCopy[index + 1],
          elementsCopy[index],
        ];
      }
    });
  return { ...slide, elements: elementsCopy };
};

const moveElementsUp = (
  elementsToMoveId: Id[],
  slide: SlideType
): SlideType => {
  let elementsCopy = [...slide.elements];
  elementsToMoveId.forEach((id) => {
    const index = elementsCopy.findIndex((element) => element.id === id);
    if (index > 0) {
      [elementsCopy[index], elementsCopy[index - 1]] = [
        elementsCopy[index - 1],
        elementsCopy[index],
      ];
    }
  });

  return { ...slide, elements: elementsCopy };
};

const moveElementsToTop = (
  elementsToMoveId: Id[],
  slide: SlideType
): SlideType => {
  const elementsToMove = slide.elements.filter((element) =>
    elementsToMoveId.includes(element.id)
  );
  const remainingElements = slide.elements.filter(
    (element) => !elementsToMoveId.includes(element.id)
  );
  return {
    ...slide,
    elements: [...elementsToMove, ...remainingElements],
  };
};

const moveElementsToBottom = (
  elementsToMoveId: Id[],
  slide: SlideType
): SlideType => {
  const elementsToMove = slide.elements.filter((element) =>
    elementsToMoveId.includes(element.id)
  );
  const remainingElements = slide.elements.filter(
    (element) => !elementsToMoveId.includes(element.id)
  );
  return {
    ...slide,
    elements: [...remainingElements, ...elementsToMove],
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
  moveElementsDown,
  moveElementsUp,
  moveElementsToTop,
  moveElementsToBottom,
  createSlideElement,
};
