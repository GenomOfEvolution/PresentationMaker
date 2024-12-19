export type SelectionType = {
  selectedElementId: string | null;
};

const createSelection = (): SelectionType => {
  return { selectedElementId: null };
};

export { createSelection };
