import React from "react";
import { SlideType } from "../../types/Slide.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "../workspace/Workspace.module.css";

type WorkspaceProps = {
  slide: SlideType;
};

const Workspace = ({ slide }: WorkspaceProps) => {
  return (
    <div className={styles.workspace}>
      <Slide scale={1} isSelected={false} className="" slide={slide}></Slide>
    </div>
  );
};

export { Workspace };
