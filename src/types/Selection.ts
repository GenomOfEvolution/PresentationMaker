export type SelectionType = {
  selectedSlidesId: string[] | null;
};

const createSelection = (): SelectionType => {
  return { selectedSlidesId: null };
};

export { createSelection };
