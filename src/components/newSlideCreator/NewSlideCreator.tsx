import { useAppActions } from "../../hooks/useAppActions";
import styles from "./NewSlideCreator.module.css";

const NewSlideCreator = () => {
  const { addNewSlide } = useAppActions();
  return (
    <div
      onClick={() => {
        addNewSlide;
      }}
      className={styles.newSlideCreator}
    >
      <span className={styles.newSlideCreator__text}>Нажмите, чтобы добавить новый слайд</span>
    </div>
  );
};

export { NewSlideCreator };
