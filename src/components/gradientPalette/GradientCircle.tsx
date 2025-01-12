import { Gradient, gradientToCss } from "../../types/BaseTypes";
import styles from "./GradientCircle.module.css";

interface GradientCircleProps {
  gradient: Gradient;
  onClick: (gradient: Gradient) => void;
}

const GradientCircle = ({ gradient, onClick }: GradientCircleProps) => {
  const handleClick = () => {
    onClick(gradient);
  };

  return (
    <div
      className={styles.gradientCircle}
      style={{
        background: gradientToCss(gradient),
        border: "1px #d9d9d9 solid",
      }}
      onClick={handleClick}
    ></div>
  );
};

export default GradientCircle;
