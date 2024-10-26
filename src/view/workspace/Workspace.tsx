import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "./Workspace.module.css";

type WorkspaceProps = {
  slide: SlideType;
};

function Workspace({ slide }: WorkspaceProps) {
  return (
    <div className={styles.workspace}>
      <Slide slide={slide}></Slide>
    </div>
  );
}

export { Workspace };
