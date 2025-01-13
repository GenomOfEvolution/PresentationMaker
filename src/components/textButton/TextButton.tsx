import { useState } from "react";
import styles from "./TextButton.module.css";
import ModalWindowSlideBg from "../modalWindow/ModalWindowSlideBg";
import { SelectionType } from "../../types/Selection";

export type TextButtonProps = {
  onClick: () => void;
  text: string;
  selection: SelectionType;
};

const TextButton = (props: TextButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleApplyAll = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    props.onClick();
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleClick} className={styles.textButton}>
        {props.text}
      </button>
      {isModalOpen && (
        <ModalWindowSlideBg selection={props.selection} onClose={handleClose} onConfirm={handleConfirm} />
      )}
    </>
  );
};

export { TextButton };
