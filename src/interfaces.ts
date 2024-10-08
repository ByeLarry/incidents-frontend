import { ChangeEvent } from "react";
import { UserDto } from "./libs/dto";

export interface InputHookReturn {
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  emailError: boolean;
  inputValid: boolean;
  minLength: number;
  maxLength: number;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  isDirty: boolean;
  setValue: (value: string) => void;
  setDirty: (value: boolean) => void;
}

export interface UserWithAccessToken {
  accessToken: string;
  user: UserDto;
}

export interface ValidationErrors {
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  emailError: boolean;
  inputValid: boolean;
  minLength: number;
  maxLength: number;
}

export interface Validation {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
}

export interface IAddress {
  description: string;
  name: string;
}
