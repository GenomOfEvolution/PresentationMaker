import { useState, useEffect, useRef } from "react";
import styles from "./DropDownButton.module.css";
import imgBtnStyles from "../imageButton/ImageButton.module.css";

export type DropDownElementProps = {
  value: string;
  onClick: (value: string) => void;
};

const DropDownElement = (props: DropDownElementProps) => {
  return (
    <button
      className={styles.dropdown__element}
      onClick={() => props.onClick(props.value)}
      style={{ fontFamily: props.value }}
    >
      {props.value}
    </button>
  );
};

export type DropDownButtonProps = {
  elements: DropDownElementProps[];
  currentValue: string;
  onSelect: (value: string) => void;
};

const DropDownButton = (props: DropDownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleElementClick = (value: string) => {
    props.onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button ref={buttonRef} className={imgBtnStyles.ImageButton} onClick={handleToggle} title="Select Font">
        <span className={styles.dropdown__text}>{props.currentValue}</span>
        <span className="material-icons" style={{ cursor: "pointer", transform: isOpen ? "scaleY(-1)" : "" }}>
          arrow_drop_down
        </span>
      </button>
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown__content}>
          {props.elements.map((elem, index) => (
            <DropDownElement key={index} value={elem.value} onClick={handleElementClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export { DropDownElement, DropDownButton };
