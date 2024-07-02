import style from "./label.module.scss";

interface LabelComponentProps {
  className?: string;
  children?: React.ReactNode;
  htmlFor?: string;
  id?: string;
}

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
