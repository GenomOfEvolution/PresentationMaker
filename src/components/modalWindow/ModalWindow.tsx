import styles from "./ModalWindow.module.css";

type ModalWindowProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const ModalWindow = ({ onCancel, onConfirm }: ModalWindowProps) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={onCancel}>Отмена</button>
        <button onClick={onConfirm}>Готово</button>
      </div>
    </div>
  );
};

export default ModalWindow;
