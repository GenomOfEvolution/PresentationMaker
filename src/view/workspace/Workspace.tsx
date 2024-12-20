import { useRef } from "react";
import { NewSlideCreator } from "../../components/newSlideCreator/NewSlideCreator.tsx";
import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "../workspace/Workspace.module.css";

type WorkspaceProps = {
  slide: SlideType;
};

const Workspace = ({ slide }: WorkspaceProps) => {
  const containerRef = useRef(null);

  if (slide === undefined) {
    return (
      <div className={styles.workspace}>
        <NewSlideCreator />
      </div>
    );
  }

  return (
    <div className={styles.workspace} ref={containerRef}>
      <Slide containerRef={containerRef} scale={1} isSelected={false} className="" slide={slide} />
    </div>
  );
};

export { Workspace };
