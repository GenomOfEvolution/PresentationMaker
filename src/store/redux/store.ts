import { legacy_createStore as createStore } from "redux";
import schema from "../../schemasAJV/schema.json";
import AJV from "ajv";
import { EditorType } from "../editorType";
import EditorReducer from "./EditorReducer";
import { createPresentation } from "../../types/Presentation";
import { createSelection } from "../../types/Selection";

const ajv = new AJV();
const validate = ajv.compile(schema);

const validateEditorData = (data: any): boolean => {
  const isValid = validate(data);
  if (!isValid) {
    console.warn("Ошибки валидации:", validate.errors);
  }
  return isValid;
};

const saveStateToLocalStorage = (state: EditorType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("editorState", serializedState);
  } catch (err) {
    console.error("Ошибка сохранения состояния в localStorage", err);
  }
};

const loadStateFromLocalStorage = (): EditorType => {
  let defaultEditor: EditorType = {
    presentation: createPresentation(),
    workingWith: "slideList",
    selection: createSelection(),
  };

  try {
    const serializedState = localStorage.getItem("editorState");
    if (!serializedState) return defaultEditor;

    const parsedState = JSON.parse(serializedState);

    if (!validateEditorData(parsedState)) {
      console.warn("Некорректные данные в localStorage. Загружается состояние по умолчанию.");
      return defaultEditor;
    }

    return parsedState as EditorType;
  } catch (err) {
    console.error("Ошибка загрузки состояния из localStorage", err);
    return defaultEditor;
  }
};

const preloadedState = loadStateFromLocalStorage();

const saveStateEnhancer =
  (createStore: any) =>
  (...args: any) => {
    const store = createStore(...args);

    store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });

    return store;
  };

const store = createStore(EditorReducer, preloadedState, saveStateEnhancer);

export { store };
