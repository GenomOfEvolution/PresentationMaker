import { BackgroundType, Slide } from "../Slide";
import { addSlide, createCollection, moveSlides, removeSlides, SlideCollection } from "../SlideCollection";

describe("Slide Collection", () => {
  describe("Creates slide collection", () => {
    it("creates slide collection and returns it", () => {
      const collection: SlideCollection = createCollection();
      expect(collection).toEqual({ slides: [] });
    });
  });

  const slide1: Slide = { id: "1", elements: [], bg: { type: BackgroundType.Color, color: "#000000" } };
  const slide2: Slide = { id: "2", elements: [], bg: { type: BackgroundType.Color, color: "#000000" } };
  const slide3: Slide = { id: "3", elements: [], bg: { type: BackgroundType.Color, color: "#000000" } };
  const slide4: Slide = { id: "4", elements: [], bg: { type: BackgroundType.Color, color: "#000000" } };
  const slide5: Slide = { id: "5", elements: [], bg: { type: BackgroundType.Color, color: "#000000" } };
  const emptyCollection: SlideCollection = createCollection();

  describe("Adds slide to collection", () => {
    let collection: SlideCollection = createCollection();
    it("adds slides to empty collection", () => {
      collection = addSlide(collection, slide1);
      expect(collection).toEqual({ slides: [slide1] });
      collection = addSlide(collection, slide2);
      collection = addSlide(collection, slide3);
      collection = addSlide(collection, slide4);
      collection = addSlide(collection, slide5);
      expect(collection).toEqual({ slides: [slide1, slide2, slide3, slide4, slide5] });
    });
  });

  describe("Removes slide from collection", () => {
    let collection: SlideCollection = createCollection();

    beforeEach(() => {
      collection = addSlide(collection, slide1);
      collection = addSlide(collection, slide2);
    });

    afterEach(() => {
      collection.slides = [];
    });

    it("removes slide from empty collection", () => {
      expect(removeSlides(["1"], emptyCollection)).toEqual(emptyCollection);
    });

    it("removes single slide from collection", () => {
      expect(removeSlides(["2"], collection)).toEqual({ slides: [slide1] });
    });

    it("removes multiple slides from collection", () => {
      expect(removeSlides(["1", "2"], collection)).toEqual({ slides: [] });
    });

    it("removes slide with no such id", () => {
      expect(removeSlides(["test-uuid"], collection)).toEqual({ slides: [slide1, slide2] });
    });
  });

  describe("Moves slide(s) to another position", () => {
    let collection: SlideCollection = createCollection();
    beforeEach(() => {
      collection = addSlide(collection, slide1);
      collection = addSlide(collection, slide2);
      collection = addSlide(collection, slide3);
      collection = addSlide(collection, slide4);
      collection = addSlide(collection, slide5);
    });

    afterEach(() => {
      collection.slides = [];
    });

    it("moves slide from empty colletcion", () => {
      expect(moveSlides(["1"], emptyCollection, 3)).toEqual(emptyCollection);
    });

    it("moves single slide", () => {
      expect(moveSlides(["4"], collection, 1)).toEqual({ slides: [slide1, slide4, slide2, slide3, slide5] });
    });

    it("moves multiple slides", () => {
      expect(moveSlides(["2", "4"], collection, 3)).toEqual({ slides: [slide1, slide3, slide5, slide2, slide4] });
    });

    it("moves slide with incorrect id", () => {
      expect(moveSlides(["test-uuid"], collection, 3)).toEqual({ slides: [slide1, slide2, slide3, slide4, slide5] });
    });

    it("moves slide to negative pos", () => {
      expect(moveSlides(["3"], collection, -3)).toEqual({ slides: [slide1, slide2, slide3, slide4, slide5] });
    });
  });
});
