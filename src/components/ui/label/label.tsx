import { LabelComponentProps } from "../../../propses/LabelComponentProps";
import style from "./label.module.scss";

export const LabelComponent: React.FC<LabelComponentProps> = (
  props: LabelComponentProps
) => {
  return (
    <label
      id={props.id}
      htmlFor={props.htmlFor}
      className={`${style.label} ${props.className}`}
    >
      {props.children}
    </label>
  );
};
