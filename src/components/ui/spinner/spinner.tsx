import "./spinner.scss";

interface SpinnerProps {
  lightMode?: boolean;
  zIndex?: number;
  className?: string;
  fixed?: boolean;
  size?: number;
  color?: string;
  visible?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  return (
    <div
      className={`${props.fixed ? "spinner--fixed" : ""}`}
      style={{
        zIndex: props.zIndex,
        width: `${props.size}px`,
        height: `${props.size}px`,
        visibility: props.visible ? "visible" : "hidden",
      }}
    >
      <div
        className={`spinner ${props.className}`}
        style={{
          width: `${props.size}px`,
          height: `${props.size}px`,
          zIndex: props.zIndex,
          borderColor: `${props.lightMode ? "" : "white"}`,
          borderTopColor: `${props.lightMode ? "" : "rgba(0, 0, 0, 0)"}`,
        }}
      ></div>
    </div>
  );
};
