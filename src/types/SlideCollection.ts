import { Id } from "./BaseTypes";
import { Presentation } from "./Presentation";
import { SlideType } from "./Slide";

const addSlide = (presentation: Presentation, newSlide: SlideType): Presentation => ({
  ...presentation,
  slideCollection: [...presentation.slideCollection, newSlide],
});

const removeSlides = (SlidesToRemoveId: Id[], presentation: Presentation): Presentation => {
  const filteredSlides = presentation.slideCollection.filter((slide) => !SlidesToRemoveId.includes(slide.id));
  return {
    ...presentation,
    slideCollection: filteredSlides,
  };
};

const moveSlides = (SlidesToMoveId: Id[], presentation: Presentation, posToMove: number): Presentation => {
  if (posToMove < 0) {
    return presentation;
  }

  const slidesToMove = presentation.slideCollection.filter((slide) => SlidesToMoveId.includes(slide.id));
  const remainingSlides = presentation.slideCollection.filter((slide) => !SlidesToMoveId.includes(slide.id));
  const newSlides = [...remainingSlides.slice(0, posToMove), ...slidesToMove, ...remainingSlides.slice(posToMove)];

  return {
    ...presentation,
    slideCollection: newSlides,
  };
};

export { addSlide, removeSlides, moveSlides };
