export interface InputComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
}
