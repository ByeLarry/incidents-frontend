import styles from "./input.module.scss";

interface InputComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  width?: number | string;
  disabled?: boolean;
}

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
      onChange={props.onChange}
      onBlur={props.onBlur}
      required={props.required}
      style={{ width: props.width }}
      disabled={props.disabled}
    />
  );
};
