export interface ValidationErrors {
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  emailError: boolean;
  inputValid: boolean;
  minLength: number;
  maxLength: number;
}
