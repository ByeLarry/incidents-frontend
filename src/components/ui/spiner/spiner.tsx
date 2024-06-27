import { SpinerProps } from "../../../propses/SpinerProps";
import "./spiner.scss";

export const Spiner: React.FC<SpinerProps> = (props: SpinerProps) => {
  return (
    <div
      className={`${props.fixed ? "spiner--fixed" : ""}`}
      style={{
        zIndex: props.zIndex,
        width: `${props.size}px`,
        height: `${props.size}px`,
        visibility: props.visible ? "visible" : "hidden",
      }}
    >
      <div
        className={`spiner ${props.className}`}
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
