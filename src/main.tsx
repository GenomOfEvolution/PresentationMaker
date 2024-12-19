import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";

const root = createRoot(document.getElementById("root")!);
const render = () => {
  root.render(<App editor={getEditor()} />);
};

addEditorChangeHandler(render);
render();
