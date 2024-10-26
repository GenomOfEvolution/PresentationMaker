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

type GradientBase = {
  gradientType: GradientType;
  colors: Color[];
};

type LinearGradient = GradientBase & {
  gradientType: GradientType.linear;
  linearDegrees: number;
};

type RadialGradient = GradientBase & {
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

export type Image = SlideObject & {
  objectType: ObjectType.Image;
  url: string;
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
