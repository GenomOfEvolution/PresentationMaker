import styles from "./ImageButton.module.css";

export type ImageButtonProps = {
  onClick: () => void;
  imageName: string;
  title: string;
};

const ImageButton = (props: ImageButtonProps) => {
  let styleName: string = "material-icons " + props.imageName;
  return (
    <button onClick={props.onClick} className={styles.ImageButton} title={props.title}>
      <i className={styleName}>{props.imageName}</i>
    </button>
  );
};

export { ImageButton };
