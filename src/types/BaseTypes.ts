export type Id = string;
export type Color = string;
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

enum ObjectType {
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

export type Gradient = LinearGradient | RadialGradient;

type SlideObject = {
  id: Id;
  layer: number;
  pos: Point;
  size: Size;
  objectType: ObjectType;
};

export type Image = SlideObject & {
  objectType: ObjectType.Image;
  url: string;
};

enum FontFormatting {
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
  content: string;
};
