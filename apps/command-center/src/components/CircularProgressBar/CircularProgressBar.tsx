import "./CircularProgressBar.css";
import "";

interface CircularProgressBarProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  circleColor?: string;
}

interface CircularProgressBarStyle extends React.CSSProperties {
  "--size"?: number;
  "--center"?: number;
  "--radius"?: number;
  "--circumference"?: number;
  "--stroke-width"?: number;
  "--stroke-color"?: string;
  "--circle-color"?: string;
}

export function CircularProgressBar({
  value,
  max = 100,
  size = 150,
  strokeWidth = 12,
  circleColor = "text-secondary",
  strokeColor = "accent",
}: CircularProgressBarProps) {
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = (clampedValue / max) * 100;

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const styleValues: CircularProgressBarStyle = {
    "--size": size,
    "--center": center,
    "--radius": radius,
    "--circumference": circumference,
    "--stroke-width": strokeWidth,
    "--stroke-color": strokeColor,
    "--circle-color": circleColor,
  };

  return (
    <div
      className="progress-bar"
      style={styleValues}
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <svg width={size} height={size} className="svg-circle">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
        />
      </svg>
      <div className="central-text" style={styleValues}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
}
