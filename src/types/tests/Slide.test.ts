import { BackgroundType, createSlide, editBackground, Slide, SlideBackground } from "../Slide";
import { Gradient, GradientType } from "../BaseTypes";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

describe("Slide", () => {
  describe("Create slide", () => {
    it("creates slide and returns it", () => {
      expect(createSlide()).toEqual({
        id: "test-uuid",
        elements: [],
        bg: { type: BackgroundType.Color, color: "#000000" },
      });
    });
  });

  describe("Edit slide bg", () => {
    const slide: Slide = createSlide();

    it("edit slide bg to another color", () => {
      const newBg: SlideBackground = { type: BackgroundType.Color, color: "#ff00ff" };
      expect(editBackground(slide, newBg)).toEqual({
        id: "test-uuid",
        elements: [],
        bg: { type: BackgroundType.Color, color: "#ff00ff" },
      });
    });

    it("edit slide bg to gradient", () => {
      const gradient: Gradient = {
        gradientType: GradientType.linear,
        linearDegrees: 0,
        colors: ["#f69d3c", "#3f87a6"],
      };
      const bgGradient: SlideBackground = { type: BackgroundType.Color, color: gradient };
      expect(editBackground(slide, bgGradient)).toEqual({
        id: "test-uuid",
        elements: [],
        bg: { type: BackgroundType.Color, color: gradient },
      });
    });

    it("edit slide bg to image", () => {
      const newBg: SlideBackground = {
        type: BackgroundType.Image,
        url: "https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg",
      };

      expect(editBackground(slide, newBg)).toEqual({
        id: "test-uuid",
        elements: [],
        bg: newBg,
      });
    });
  });

  // describe("Edit slide element text", () => {
  //   const textElem: SlideElement = {fontSize: 5, };
  //   it("edits text`s font size", () => {
  //     expect(editTextFontSize());
  //   });
  // });
});
