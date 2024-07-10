import "./tooltip.scss";

interface Props {
  top?: number;
  left?: number;
  zIndex?: number;
  children?: React.ReactNode;
  text?: string;
  visible?: boolean;
}

export const TooltipComponent: React.FC<Props> = (props: Props) => {
  return (
    <div className="tooltip">
      {props.children}
      <span
        className="tooltiptext"
        style={{ display: props.visible ? "block" : "none" }}
      >
        {props.text}
      </span>
    </div>
  );
};
