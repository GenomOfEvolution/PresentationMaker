import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createPresentation } from "./types/Presentation.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App presentation={createPresentation()} />
  </StrictMode>,
);
