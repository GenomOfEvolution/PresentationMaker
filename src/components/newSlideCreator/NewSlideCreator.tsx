import { dispatch } from "../../store/editor";
import { addNewSlide } from "../../store/functions/addSlide";
import styles from "./NewSlideCreator.module.css";

const NewSlideCreator = () => {
  return (
    <div
      onClick={() => {
        dispatch(addNewSlide);
      }}
      className={styles.newSlideCreator}
    >
      <span className={styles.newSlideCreator__text}>Нажмите, чтобы добавить новый слайд</span>
    </div>
  );
};

export { NewSlideCreator };
