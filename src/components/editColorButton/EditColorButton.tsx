import { useState, useEffect, useRef, CSSProperties } from "react";
import { Color, Gradient, gradientToCss } from "../../types/BaseTypes";
import styles from "./EditColorButton.module.css";
import colorsIcon from "../../assets/colors.svg";
import inkMarker from "../../assets/ink_marker.svg";
import inkHighlighter from "../../assets/ink_highlighter.svg";
import palette from "../../assets/palette.svg";
import ColorPalette from "../colorPalette/ColorPalette";
import GradientPalette from "../gradientPalette/GradientPalette";

export type EditColorButtonProps = {
  elemColor: Color | Gradient;
  iconName: string;
  onClick: () => void;
  title: string;
  needTransparent: boolean;
  needGradient: boolean;
  onColorChange: (color: Color | Gradient) => void;
};

const EditColorButton = (props: EditColorButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(true);
  const [underlineColor, setUnderlineColor] = useState<CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((props.elemColor as Gradient).gradientType !== undefined) {
      setUnderlineColor({ backgroundImage: gradientToCss(props.elemColor as Gradient) });
    } else {
      setUnderlineColor({ backgroundColor: props.elemColor as Color });
    }
  }, [props.elemColor]);

  let icon;
  if (props.iconName === "colors") {
    icon = colorsIcon;
  }

  if (props.iconName === "ink_highlighter") {
    icon = inkHighlighter;
  }

  if (props.iconName === "ink_marker") {
    icon = inkMarker;
  }

  if (props.iconName === "palette") {
    icon = palette;
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
    props.onClick();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorSelect = (color: Color) => {
    props.onColorChange(color);
    setUnderlineColor({ backgroundColor: color });
    setIsOpen(false);
  };

  const handleGradientSelect = (gradient: Gradient) => {
    props.onColorChange(gradient);
    setUnderlineColor({ backgroundImage: gradientToCss(gradient) });
    setIsOpen(false);
  };

  return (
    <div>
      <button className={styles.editColorButton} onClick={handleClick} title={props.title}>
        <img src={icon} alt={props.iconName} />
        <div className={styles.editColorButton__underline} style={underlineColor}></div>
      </button>
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {props.needGradient ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className={`${styles.decideButton} ${showColorPalette ? styles.selected : ""}`}
                onClick={() => setShowColorPalette(true)}
              >
                Один цвет
              </button>
              <button
                className={`${styles.decideButton} ${!showColorPalette ? styles.selected : ""}`}
                onClick={() => setShowColorPalette(false)}
              >
                Градиент
              </button>
            </div>
          ) : (
            <></>
          )}
          {!props.needGradient && (
            <ColorPalette needTransparent={props.needTransparent} onColorSelect={handleColorSelect} />
          )}
          {showColorPalette && props.needGradient ? (
            <ColorPalette needTransparent={props.needTransparent} onColorSelect={handleColorSelect} />
          ) : (
            props.needGradient && <GradientPalette onGradientSelect={handleGradientSelect} />
          )}
        </div>
      )}
    </div>
  );
};

export { EditColorButton };
