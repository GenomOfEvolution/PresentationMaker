import React, { useState } from "react";
import styles from "./ImageButton.module.css";
import ModalWindow from "../modalWindow/modalWindow";

export type ImageButtonProps = {
  onClick: () => void;
  imageName: string;
  title: string;
};

const ImageButton = (props: ImageButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    props.onClick();
    setIsModalOpen(false);
  };

  let styleName: string = "material-icons " + props.imageName;
  return (
    <>
      <button onClick={handleClick} className={styles.ImageButton} title={props.title}>
        <i className={styleName}>{props.imageName}</i>
      </button>
      {isModalOpen && <ModalWindow onCancel={handleCancel} onConfirm={handleConfirm} />}
    </>
  );
};

export { ImageButton };
