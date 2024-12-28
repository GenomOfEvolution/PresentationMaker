import { useRef } from "react";
import { NewSlideCreator } from "../../components/newSlideCreator/NewSlideCreator.tsx";
import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "../workspace/Workspace.module.css";
import { SelectionType } from "../../types/Selection.ts";

type WorkspaceProps = {
  slide: SlideType;
  selection: SelectionType;
  containerRef: any;
};

const Workspace = ({ slide, selection, containerRef }: WorkspaceProps) => {
  if (slide === undefined) {
    return (
      <div className={styles.workspace}>
        <NewSlideCreator />
      </div>
    );
  }

  return (
    <div className={styles.workspace}>
      <Slide selection={selection} containerRef={containerRef} scale={1} className="" slide={slide} />
    </div>
  );
};

export { Workspace };
