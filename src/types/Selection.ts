export type SelectionType = {
  selectedSlidesId: string[] | null;
  selectedSlideObjectsId: string[] | null;
};

const createSelection = (): SelectionType => {
  return { selectedSlidesId: null, selectedSlideObjectsId: null };
};

export { createSelection };
