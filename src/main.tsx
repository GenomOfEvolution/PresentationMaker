import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createPresentation, Presentation } from "./types/Presentation.ts";
import { createSelection, SelectionType } from "./types/Selection.ts";
import { addSlide } from "./types/SlideCollection.ts";
import {
  addElement,
  BackgroundType,
  createSlide,
  editBackground,
  SlideType,
} from "./types/Slide.ts";
import {
  createLinearGradient,
  createTextObject,
  GradientType,
} from "./types/BaseTypes.ts";
import React from "react";

let sel: SelectionType = createSelection();
let pres: Presentation = createPresentation();
let slide: SlideType = createSlide();

slide = addElement(
  slide,
  createTextObject(
    { x: 50, y: 100 },
    { width: 200, height: 50 },
    "Пример текста"
  )
);

pres = addSlide(pres, slide);
pres = addSlide(pres, createSlide());
pres = addSlide(pres, createSlide());
pres = addSlide(pres, createSlide());
pres = addSlide(pres, createSlide());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App presentation={pres} selection={sel} />
  </StrictMode>
);
