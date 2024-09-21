import { createCollection, SlideCollection } from "./SlideCollection";

export type Presentation = {
  name: string;
  slideCollection: SlideCollection;
};

const createPresentation = (): Presentation => ({
  name: "New presentation",
  slideCollection: createCollection(),
});

const editName = (newName: string, presentation: Presentation): Presentation => {
  if (newName.trim() === "") {
    return { ...presentation, name: "New presentation" };
  }

  return { ...presentation, name: newName };
};

export { createPresentation, editName };
