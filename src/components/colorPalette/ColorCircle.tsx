import styles from "./ColorCircle.module.css";

interface ColorCircleProps {
  color: string;
  onClick: (color: string) => void;
}

const ColorCircle = ({ color, onClick }: ColorCircleProps) => {
  const isNearWhite = (color: string): boolean => {
    const bigint = parseInt(color.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return 255 * 3 - r - g - b < 120;
  };

  const handleClick = () => {
    onClick(color);
  };

  return (
    <div
      className={styles.circle}
      style={{
        backgroundColor: color,
        border: isNearWhite(color) ? "1px #d9d9d9 solid" : "none",
      }}
      onClick={handleClick}
    ></div>
  );
};

export default ColorCircle;
