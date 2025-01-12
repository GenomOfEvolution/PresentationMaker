import { useState } from "react";
import { v4 } from "uuid";
import styles from "./ColorAnother.module.css";

interface ColorAnotherProps {
  onColorSelect: (color: string) => void;
}

const ColorAnother = ({ onColorSelect }: ColorAnotherProps) => {
  const colorId = v4();
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleMouseUp = () => {
    if (selectedColor) {
      onColorSelect(selectedColor);
    }
  };

  return (
    <label htmlFor={colorId} className={styles.colorAnother}>
      <span>Другой</span>
      <input
        type="color"
        id={colorId}
        className={styles.colorAnother__input}
        onChange={handleColorChange}
        onMouseUp={handleMouseUp}
      ></input>
    </label>
  );
};

export default ColorAnother;
