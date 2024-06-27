import { ButtonComponentProps } from "../../../propses/ButtonComponentProps";
import styles from "./button.module.scss";
export const ButtonComponent: React.FC<ButtonComponentProps> = (
  props: ButtonComponentProps
) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      className={`${styles.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};
