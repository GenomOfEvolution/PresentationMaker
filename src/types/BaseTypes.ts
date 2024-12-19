import { v4 as uuidv4 } from "uuid";

export type Id = string;
export type Color = string;
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export enum ObjectType {
  Text,
  Image,
}

export enum GradientType {
  linear,
  radial,
}

export enum RadialDirections {
  center,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}

export type GradientBase = {
  gradientType: GradientType;
  colors: Color[];
};

export type LinearGradient = GradientBase & {
  gradientType: GradientType.linear;
  linearDegrees: number;
};

export const createLinearGradient = (colors: string[], degrees: number): LinearGradient => {
  return { gradientType: GradientType.linear, colors: colors, linearDegrees: degrees };
};

const stringToRadialDir = (str: "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"): RadialDirections => {
  switch (str) {
    case "center":
      return RadialDirections.center;
    case "bottomLeft":
      return RadialDirections.bottomLeft;
    case "bottomRight":
      return RadialDirections.bottomRight;
    case "topLeft":
      return RadialDirections.topLeft;
    case "topRight":
      return RadialDirections.topRight;
  }
};

export const createRadialGradient = (
  colors: string[],
  direction: "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
): RadialGradient => {
  return { gradientType: GradientType.radial, colors: colors, radialCenter: stringToRadialDir(direction) };
};

export type RadialGradient = GradientBase & {
  gradientType: GradientType.radial;
  radialCenter: RadialDirections;
};

export const gradientToCss = (gradient: Gradient): string => {
  const colorsString = gradient.colors.join(", ");

  if (gradient.gradientType === GradientType.linear) {
    return `linear-gradient(${gradient.linearDegrees}deg, ${colorsString})`;
  } else {
    let position;
    switch (gradient.radialCenter) {
      case RadialDirections.center:
        position = "center";
        break;
      case RadialDirections.topLeft:
        position = "at top left";
        break;
      case RadialDirections.topRight:
        position = "at top right";
        break;
      case RadialDirections.bottomLeft:
        position = "at bottom left";
        break;
      case RadialDirections.bottomRight:
        position = "at bottom right";
        break;
      default:
        position = "center";
    }
    return `radial-gradient(circle at ${position}, ${colorsString})`;
  }
};

export type Gradient = LinearGradient | RadialGradient;

export type SlideObject = {
  id: Id;
  pos: Point;
  size: Size;
  objectType: ObjectType;
};

export const createSlideObject = (pos: Point, size: Size): SlideObject => {
  return {
    id: uuidv4(),
    pos: pos,
    size: size,
    objectType: ObjectType.Text,
  };
};

export type ImageSource = "URL" | "Base64";

export type Image = SlideObject & {
  objectType: ObjectType.Image;
  url: string;
  source: ImageSource;
};

export const createImageObject = (pos: Point, size: Size, url: string, source: ImageSource): Image => {
  return {
    id: uuidv4(),
    pos: pos,
    size: size,
    objectType: ObjectType.Image,
    url: url,
    source: source,
  };
};

export const createTextObject = (pos: Point, size: Size, val: string): Text => {
  return {
    id: uuidv4(),
    pos: pos,
    size: size,
    objectType: ObjectType.Text,
    fontSize: 14,
    fontName: "Arial",
    fontFormatting: FontFormatting.none,
    fontColor: "#000000",
    fontBgColor: "transparent",
    content: val,
  };
};

export enum FontFormatting {
  none,
  bold,
  italic,
  underlined,
}

export type Text = SlideObject & {
  objectType: ObjectType.Text;
  fontSize: number;
  fontName: string;
  fontFormatting: FontFormatting;
  fontColor: Color;
  fontBgColor: Color;
  content: string | null;
};
