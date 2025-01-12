import styles from "./ColorTransparent.module.css";

interface ColorTransparentProps {
  onClick: (color: string) => void;
}

const ColorTransparent = ({ onClick }: ColorTransparentProps) => {
  const handleClick = () => {
    onClick("transparent");
  };

  let styleName: string = "material-icons format_color_reset";
  return (
    <button onClick={handleClick} className={styles.buttonTransparent}>
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
