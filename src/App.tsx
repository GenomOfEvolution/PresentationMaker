import styles from "./App.module.css";
import { SlidesList } from "./view/slidesList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { EditorType } from "./store/editorType";

type AppProps = {
  editor: EditorType;
};

const App = ({ editor }: AppProps) => {
  const activeSlideIndex = editor.presentation.slideCollection.filter((slide) => {
    if (slide.id === editor.selection.selectedSlideId) return slide;
  });

  return (
    <>
      <TopPanel title={editor.presentation.name} selection={editor.selection}></TopPanel>
      <div className={styles.container}>
        <SlidesList slides={editor.presentation.slideCollection} selection={editor.selection}></SlidesList>
        <Workspace slide={activeSlideIndex[0]}></Workspace>
      </div>
    </>
  );
};

export default App;
