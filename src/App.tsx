import styles from "./App.module.css";
import { Presentation } from "./types/Presentation";
import { SlidesList } from "./view/slidesList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { SelectionType } from "./types/Selection";
import React from "react";

type AppProps = {
  presentation: Presentation;
  selection: SelectionType;
};

const App = ({ presentation, selection }: AppProps) => {
  selection.selectedElementId = presentation.slideCollection[0].id;
  return (
    <>
      <TopPanel title={presentation.name}></TopPanel>
      <div className={styles.container}>
        <SlidesList
          slides={presentation.slideCollection}
          selection={selection}
        ></SlidesList>
        <Workspace slide={presentation.slideCollection[0]}></Workspace>
      </div>
    </>
  );
};

export default App;
