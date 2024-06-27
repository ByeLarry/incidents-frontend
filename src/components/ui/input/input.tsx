import { InputComponentProps } from "../../../propses/InputComponentProps";
import styles from "./input.module.scss";
export const InputComponent: React.FC<InputComponentProps> = (
  props: InputComponentProps
) => {
  return (
    <input
      className={`${styles.input} ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      id={props.id}
      name={props.name}
    />
  );
};
