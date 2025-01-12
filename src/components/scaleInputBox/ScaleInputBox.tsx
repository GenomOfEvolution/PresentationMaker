import React, { useState } from "react";
import { ImageButton } from "../imageButton/ImageButton";
import styles from "./ScaleInputBox.module.css";

export type ScaleInputBoxProps = {
  initialValue: number;
  onChange: (newValue: number) => void;
};

const ScaleInputBox = (props: ScaleInputBoxProps) => {
  const [value, setValue] = useState(props.initialValue);

  const handleDecrease = () => {
    const newValue = Math.max(value - 1, 1);
    setValue(newValue);
    props.onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  return (
    <div className={styles.scaleInputBoxContainer}>
      <ImageButton title="Уменьшить размер шрифта" imageName="remove" onClick={handleDecrease} />
      <input className={styles.scaleInputBox} type="number" min="0" value={value} onChange={handleInputChange} />
      <ImageButton title="Увеличить размер шрифта" imageName="add" onClick={handleIncrease} />
    </div>
  );
};

export { ScaleInputBox };
