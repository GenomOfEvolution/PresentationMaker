import { v4 } from "uuid";
import styles from "./ColorAnother.module.css";

const ColorAnother = () => {
  const colorId = v4();
  return (
    <label htmlFor={colorId} className={styles.colorAnother}>
      <span>Другой</span>
      <input type="color" id={colorId} className={styles.colorAnother__input}></input>
    </label>
  );
};

export default ColorAnother;
