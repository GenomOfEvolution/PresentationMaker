import styles from "./TextButton.module.css";

export type TextButton = {
  onClick: () => void;
  text: string;
};

const TextButton = (props: TextButton) => {
  return (
    <button onClick={props.onClick} className={styles.textButton}>
      {props.text}
    </button>
  );
};

export { TextButton };
