export type SelectionType = {
  selectedSlideId: string | null;
};

const createSelection = (): SelectionType => {
  return { selectedSlideId: null };
};

export { createSelection };
