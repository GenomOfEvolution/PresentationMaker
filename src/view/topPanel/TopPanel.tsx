import styles from "./TopPanel.module.css";
import { Button } from "../../components/button/Button.tsx";
// import { dispatch } from "../../store/editor.ts";
// import { removeSlide } from "../../store/removeSlide.ts";
// import { renamePresentationTitle } from "../../store/renamePresentationTitle.ts";
// import * as React from "react";

type TopPanelProps = {
  title: string;
};

function TopPanel({ title }: TopPanelProps) {
  /*function onAddSlide() {}
  function onRemoveSlide() {
    dispatch(removeSlide);
  }
  const onTitleChange: React.ChangeEventHandler = (event) => {
    dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value);
  };*/
  return (
    <div className={styles.topPanel}>
      <input className={styles.title} type="text" defaultValue={title} />
      <div>
        <Button className={styles.button} text={"Добавить слайд"} onClick={() => console.log("Adding slide")}></Button>
        <Button className={styles.button} text={"Удалить слайд"} onClick={() => console.log("Deleting slide")}></Button>
      </div>
    </div>
  );
}

export { TopPanel };
