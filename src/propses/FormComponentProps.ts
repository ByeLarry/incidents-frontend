export interface FormComponentProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  action?: string;
  title: string;
}
