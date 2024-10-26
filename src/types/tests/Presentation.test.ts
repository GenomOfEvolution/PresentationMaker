import { createPresentation, editName, Presentation } from "../Presentation";

describe("Presentation", () => {
  describe("Create presentation", () => {
    it("creates presentation", () => {
      expect(createPresentation()).toEqual({ name: "New presentation", slideCollection: [] });
    });
  });

  describe("Rename presentation", () => {
    const pres: Presentation = createPresentation();
    it("renames presentation", () => {
      expect(editName("Cool presentation", pres)).toEqual({
        name: "Cool presentation",
        slideCollection: [],
      });
    });

    it("not renames to empty name", () => {
      expect(editName("    ", pres)).toEqual(pres);
      expect(editName("", pres)).toEqual(pres);
    });
  });
});
