export interface ButtonComponentProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  title?: string;
}
