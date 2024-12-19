import { SlideType } from "./Slide";

export type Presentation = {
  name: string;
  slideCollection: SlideType[];
};

const createPresentation = (): Presentation => ({
  name: "New presentation",
  slideCollection: [],
});

const editName = (newName: string, presentation: Presentation): Presentation => {
  if (newName.trim() === "") {
    return { ...presentation, name: "New presentation" };
  }

  return { ...presentation, name: newName };
};

export { createPresentation, editName };
