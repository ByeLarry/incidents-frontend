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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
}
