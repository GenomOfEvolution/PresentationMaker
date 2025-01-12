import styles from "./ColorTransparent.module.css";

const ColorTransparent = () => {
  let styleName: string = "material-icons format_color_reset";
  return (
    <button onClick={() => console.log("transparent")} className={styles.buttonTransparent}>
      <i style={{ userSelect: "none" }} className={styleName}>
        format_color_reset
      </i>
      <span style={{ userSelect: "none" }} className={styles.buttonTransparent__Text}>
        Прозрачный
      </span>
    </button>
  );
};

export default ColorTransparent;
