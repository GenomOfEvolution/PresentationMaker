import { useState, useCallback } from "react";
import { Image, Text } from "../../types/BaseTypes";

const useCreateAppContext = () => {
  const [test, setTest] = useState("Hello world");
  const [currentElement, setElement] = useState<Image | Text | null>(null);

  const toggleTest = useCallback(() => {
    setTest((_test) => (_test === "Hi" ? "You are awesome" : "Hi"));
  }, []);

  const setCurrentElement = useCallback((element: Image | Text | null) => {
    setElement(element);
  }, []);

  return {
    test,
    toggleTest,
    currentElement,
    setCurrentElement,
  };
};

export { useCreateAppContext };
