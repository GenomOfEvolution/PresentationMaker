import { useState, useCallback } from "react";
import { Image, Text } from "../../types/BaseTypes";

const useCreateAppContext = () => {
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
