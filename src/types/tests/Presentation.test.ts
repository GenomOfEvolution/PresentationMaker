import { createPresentation, editName, Presentation } from "../Presentation";
import { createCollection } from "../SlideCollection";

describe("Presentation", () => {
  describe("Create presentation", () => {
    it("creates presentation", () => {
      expect(createPresentation()).toEqual({ name: "New presentation", slideCollection: createCollection() });
    });
  });

  describe("Rename presentation", () => {
    const pres: Presentation = createPresentation();
    it("renames presentation", () => {
      expect(editName("Cool presentation", pres)).toEqual({
        name: "Cool presentation",
        slideCollection: createCollection(),
      });
    });

    it("not renames to empty name", () => {
      expect(editName("    ", pres)).toEqual(pres);
      expect(editName("", pres)).toEqual(pres);
    });
  });
});
