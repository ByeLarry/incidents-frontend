import "./textarea.scss";

interface Props {
  placeholder?: string;
  rows?: number;
  cols?: number;
  id?: string;
  name?: string;
  maxLength?: number;
  width?: number | string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement >) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextareaComponent: React.FC<Props> = (props: Props) => {
  return (
    <textarea
      className="textarea"
      placeholder={props.placeholder}
      rows={props.rows}
      cols={props.cols}
      id={props.id}
      name={props.name}
      maxLength={props.maxLength}
      style={{ width: props.width }}
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};
