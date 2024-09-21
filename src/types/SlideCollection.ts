import { Id } from "./BaseTypes";
import { Slide } from "./Slide";

export type SlideCollection = {
  slides: Slide[];
};

const createCollection = (): SlideCollection => ({
  slides: [],
});

const addSlide = (collection: SlideCollection, newSlide: Slide): SlideCollection => ({
  slides: [...collection.slides, newSlide],
});

const removeSlides = (SlidesToRemoveId: Id[], collection: SlideCollection): SlideCollection => {
  const filteredSlides = collection.slides.filter((slide) => !SlidesToRemoveId.includes(slide.id));
  return {
    slides: filteredSlides,
  };
};

const moveSlides = (SlidesToMoveId: Id[], collection: SlideCollection, posToMove: number): SlideCollection => {
  if (posToMove < 0) {
    return collection;
  }

  const slidesToMove = collection.slides.filter((slide) => SlidesToMoveId.includes(slide.id));
  const remainingSlides = collection.slides.filter((slide) => !SlidesToMoveId.includes(slide.id));
  const newSlides = [...remainingSlides.slice(0, posToMove), ...slidesToMove, ...remainingSlides.slice(posToMove)];

  return {
    slides: newSlides,
  };
};

export { createCollection, addSlide, removeSlides, moveSlides };
