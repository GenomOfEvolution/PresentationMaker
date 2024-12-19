import React from "react";
import styles from "./ScaleInputBox.module.css";

export type ScaleInputBoxProps = {
  num: string;
  onChange: () => void;
};

const ScaleInputBox = (props: ScaleInputBoxProps) => {
  return (
    <input
      className={styles.scaleInputBox}
      type="text"
      pattern="[0-9]*"
      value={props.num}
      onChange={props.onChange}
    ></input>
  );
};

export { ScaleInputBox };
