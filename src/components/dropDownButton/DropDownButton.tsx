import { v4 } from "uuid";
import styles from "./DropDownButton.module.css";
import imgBtnStyles from "../imageButton/ImageButton.module.css";

export type DropDownElementProps = {
  value: string;
  onClick: () => void;
};

const DropDownElement = (props: DropDownElementProps) => {
  return (
    <button className={styles.dropdown__element} onClick={props.onClick} style={{ fontFamily: props.value }}>
      {props.value}
    </button>
  );
};

export type DropDownButtonProps = {
  elements: DropDownElementProps[];
  currentValue: string;
};

const DropDownButton = (props: DropDownButtonProps) => {
  const dropDownId: string = v4();
  return (
    <div className={styles.dropdown}>
      <input id={dropDownId} type="checkbox" className={styles.dropdown__input} />
      <button className={imgBtnStyles.ImageButton}>
        <label htmlFor={dropDownId} className={styles.dropdown__text}>
          {props.currentValue}
        </label>
        <label htmlFor={dropDownId} className="material-icons" style={{ cursor: "pointer" }}>
          arrow_drop_down
        </label>
      </button>
      <div className={styles.dropdown__content}>
        {props.elements.map((elem, index) => (
          <DropDownElement key={index} value={elem.value} onClick={elem.onClick} />
        ))}
      </div>
    </div>
  );
};

export { DropDownElement, DropDownButton };
