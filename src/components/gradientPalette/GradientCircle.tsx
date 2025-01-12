import { Gradient, gradientToCss } from "../../types/BaseTypes";
import styles from "./GradientCircle.module.css";

interface ColorCircleProps {
  gradient: Gradient;
}

const GradientCircle = ({ gradient }: ColorCircleProps) => {
  const handleClick = () => {
    console.log(gradient);
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
