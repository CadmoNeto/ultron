import "./CircularProgressBar.css";

interface CircularProgressBarProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  circleColor?: string;
  label?: string;
}

interface CircularProgressBarStyle extends React.CSSProperties {
  "--size"?: string;
  "--text-color"?: string;
}

export function CircularProgressBar({
  value,
  max = 100,
  size = 150,
  strokeWidth = 12,
  circleColor = "--text-secondary",
  strokeColor = "--accent",
  label,
}: CircularProgressBarProps) {
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = (clampedValue / max) * 100;

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (value > 90) {
    circleColor = "darkred";
    strokeColor = "red";
  }

  const resolvedCircleColor = circleColor.includes("--")
    ? `var(${circleColor})`
    : circleColor;
  const resolvedStrokeColor = strokeColor.includes("--")
    ? `var(${strokeColor})`
    : strokeColor;

  const styleValues: CircularProgressBarStyle = {
    "--size": `${size}px`,
    "--text-color": resolvedStrokeColor,
  };

  return (
    <>
      <p className="circle-title" style={styleValues}>
        {label}
      </p>
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
            stroke={resolvedCircleColor}
            strokeWidth={strokeWidth}
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={resolvedStrokeColor}
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
    </>
  );
}
