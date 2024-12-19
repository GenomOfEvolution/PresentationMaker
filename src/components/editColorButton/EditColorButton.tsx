import { CSSProperties } from "react";
import { Color, Gradient, gradientToCss } from "../../types/BaseTypes";
import styles from "./EditColorButton.module.css";
import colorsIcon from "../../assets/colors.svg";
import inkMarker from "../../assets/ink_marker.svg";
import inkHighlither from "../../assets/ink_highlighter.svg";
import palette from "../../assets/palette.svg";

export type EditColorButtonProps = {
  elemColor: Color | Gradient;
  iconName: string;
  onClick: () => void;
};

const EditColorButton = (props: EditColorButtonProps) => {
  const underlineColor: CSSProperties = {};

  if ((props.elemColor as Gradient).gradientType !== undefined) {
    underlineColor.backgroundImage = gradientToCss(props.elemColor as Gradient);
  } else {
    underlineColor.backgroundColor = props.elemColor as Color;
  }

  let icon;
  if (props.iconName === "colors") {
    icon = colorsIcon;
  }

  if (props.iconName === "ink_highlither") {
    icon = inkHighlither;
  }

  if (props.iconName === "ink_marker") {
    icon = inkMarker;
  }

  if (props.iconName === "palette") {
    icon = palette;
  }

  return (
    <button className={styles.editColorButton} onClick={props.onClick}>
      <img src={icon} />
      <div className={styles.editColorButton__underline} style={underlineColor}></div>
    </button>
  );
};

export { EditColorButton };
