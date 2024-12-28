import styles from "./App.module.css";
import { SlidesList } from "./view/slidesList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { EditorType } from "./store/editorType";
import { AppContextProvider } from "./contexts/appContext/AppContextProvider";
import { useRef } from "react";

type AppProps = {
  editor: EditorType;
};

const App = ({ editor }: AppProps) => {
  const activeSlide = editor.presentation.slideCollection.find((slide) =>
    editor.selection.selectedSlidesId!.includes(slide.id),
  );

  const containerRef = useRef(null);

  return (
    <>
      <AppContextProvider>
        <TopPanel title={editor.presentation.name} selection={editor.selection} />
        <div className={styles.container}>
          <SlidesList slides={editor.presentation.slideCollection} selection={editor.selection} />
          <div className={styles.workspace__wrapper} ref={containerRef}>
            <Workspace containerRef={containerRef} selection={editor.selection} slide={activeSlide!} />
          </div>
        </div>
      </AppContextProvider>
    </>
  );
};

export default App;
