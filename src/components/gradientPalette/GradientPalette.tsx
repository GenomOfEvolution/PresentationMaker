import GradientCircle from "./GradientCircle.tsx";
import styles from "./GradientPalette.module.css";
import { Gradient, GradientType, RadialDirections } from "../../types/BaseTypes.ts";

const gradients: Gradient[] = [
  { colors: ["#050505", "#4d4d4d"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#222222", "#696969"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#444444", "#8b8b8b"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#777777", "#bebebe"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#949494", "#dcdcdc"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#a9a9a9", "#f0f0f0"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#b6b6b6", "#fdfdfd"], gradientType: GradientType.linear, linearDegrees: 0 },

  {
    colors: ["#050505", "#4d4d4d"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#222222", "#696969"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#444444", "#8b8b8b"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#777777", "#bebebe"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#949494", "#dcdcdc"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#a9a9a9", "#f0f0f0"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#b6b6b6", "#fdfdfd"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },

  { colors: ["#db6c6c", "#f4cece"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#f0ad68", "#fcead9"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#fad361", "#fef5d9"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#95be85", "#dbebd4"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#729fe8", "#dde8fa"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#74a6d7", "#d2e3f4"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#9384bd", "#dad3ea"], gradientType: GradientType.linear, linearDegrees: 0 },

  {
    colors: ["#db6c6c", "#f4cece"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#f0ad68", "#fcead9"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#fad361", "#fef5d9"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#95be85", "#dbebd4"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#729fe8", "#dde8fa"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#74a6d7", "#d2e3f4"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#9384bd", "#dad3ea"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },

  { colors: ["#810505", "#c70101"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#9b540a", "#e17708"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#a57e06", "#ecb202"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#31631d", "#4a9b27"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#1e51ab", "#2c6ee0"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#0e487d", "#0f6cc0"], gradientType: GradientType.linear, linearDegrees: 0 },
  { colors: ["#2f1c62", "#46269a"], gradientType: GradientType.linear, linearDegrees: 0 },

  {
    colors: ["#810505", "#c70101"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#9b540a", "#e17708"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#a57e06", "#ecb202"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#31631d", "#4a9b27"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#1e51ab", "#2c6ee0"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#0e487d", "#0f6cc0"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
  {
    colors: ["#2f1c62", "#46269a"].reverse(),
    gradientType: GradientType.radial,
    radialCenter: RadialDirections.center,
  },
];

export type GradientPaletteProps = {
  onGradientSelect: (gradient: Gradient) => void;
};

const GradientPalette = ({ onGradientSelect }: GradientPaletteProps) => {
  return (
    <div className={styles.palette}>
      {gradients.map((gradient, index) => (
        <GradientCircle key={index} gradient={gradient} onClick={() => onGradientSelect(gradient)} />
      ))}
    </div>
  );
};

export default GradientPalette;
