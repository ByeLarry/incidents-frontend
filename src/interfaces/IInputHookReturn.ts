import { ChangeEvent } from "react";

export interface InputHookReturn {
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  emailError: boolean;
  inputValid: boolean;
  minLength: number;
  maxLength: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
  setValue: (value: string) => void;
  setDirty: (value: boolean) => void;
}
