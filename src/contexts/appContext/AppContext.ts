import { useState, useCallback } from "react";
import { Image, Text } from "../../types/BaseTypes";

export type AppContextType = {
  currentElement: Image | Text | null;
  setCurrentElement: (element: Image | Text | null) => void;
};

const useCreateAppContext = (): AppContextType => {
  const [currentElement, setElement] = useState<Image | Text | null>(null);

  const setCurrentElement = useCallback((element: Image | Text | null) => {
    setElement(element);
  }, []);

  return {
    currentElement,
    setCurrentElement,
  };
};

export { useCreateAppContext };
