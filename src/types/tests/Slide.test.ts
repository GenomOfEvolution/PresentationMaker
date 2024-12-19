import {
  addElement,
  BackgroundType,
  createSlide,
  editBackground,
  moveElementsDown,
  moveElementsUp,
  SlideType,
  SlideBackground,
  SlideElement,
  createSlideElement,
  moveElementsToTop,
  moveElementsToBottom,
} from "../Slide";
import { Gradient, GradientType, ObjectType } from "../BaseTypes";

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
    const slide: SlideType = createSlide();

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

  describe("Slide element movement functions", () => {
    let slide: SlideType = createSlide();

    let elem1: SlideElement = createSlideElement({ x: 0, y: 0 }, { width: 100, height: 100 }, ObjectType.Text);
    let elem2: SlideElement = createSlideElement({ x: 10, y: 10 }, { width: 100, height: 100 }, ObjectType.Text);
    let elem3: SlideElement = createSlideElement({ x: 20, y: 20 }, { width: 100, height: 100 }, ObjectType.Text);
    let elem4: SlideElement = createSlideElement({ x: 30, y: 30 }, { width: 100, height: 100 }, ObjectType.Text);

    elem1.id = "1";
    elem2.id = "2";
    elem3.id = "3";
    elem4.id = "4";

    slide = addElement(slide, elem1);
    slide = addElement(slide, elem2);
    slide = addElement(slide, elem3);
    slide = addElement(slide, elem4);

    describe("moveElementsDown", () => {
      it("should move an element down by one position", () => {
        const updatedSlide = moveElementsDown(["2"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "3", "2", "4"]);
      });

      it("should not move the last element down", () => {
        const updatedSlide = moveElementsDown(["4"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "2", "3", "4"]);
      });

      it("should handle multiple elements moving down", () => {
        const updatedSlide = moveElementsDown(["2", "3"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "4", "2", "3"]);
      });
    });

    describe("moveElementsUp", () => {
      it("should move an element up by one position", () => {
        const updatedSlide = moveElementsUp(["3"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "3", "2", "4"]);
      });

      it("should not move the first element up", () => {
        const updatedSlide = moveElementsUp(["1"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "2", "3", "4"]);
      });

      it("should handle multiple elements moving up", () => {
        const updatedSlide = moveElementsUp(["3", "4"], slide);
        expect(updatedSlide.elements.map((el) => el.id)).toEqual(["1", "3", "4", "2"]);
      });
    });

    describe("moveElementsToTop", () => {
      it("should move specified elements to the top of the slide", () => {
        const result = moveElementsToTop(["2", "3"], slide);
        expect(result.elements.map((el) => el.id)).toEqual(["2", "3", "1", "4"]);
      });

      it("should not modify the slide if no elements are specified to move", () => {
        const result = moveElementsToTop([], slide);
        const originalOrder = slide.elements.map((element) => element.id);
        const resultOrder = result.elements.map((element) => element.id);
        expect(resultOrder).toEqual(originalOrder);
      });
    });

    describe("moveElementsToBottom", () => {
      it("should move specified elements to the bottom of the slide", () => {
        const result = moveElementsToBottom(["1"], slide);
        expect(result.elements.map((el) => el.id)).toEqual(["2", "3", "4", "1"]);
      });

      it("should not modify the slide if no elements are specified to move", () => {
        const result = moveElementsToBottom([], slide);
        const originalOrder = slide.elements.map((element) => element.id);
        const resultOrder = result.elements.map((element) => element.id);
        expect(resultOrder).toEqual(originalOrder);
      });
    });
  });
});
