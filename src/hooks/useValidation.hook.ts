import { useEffect, useState } from "react";
import { emailReg } from "../utils/email.util";
import { Validation } from "../interfaces/IValidators";
import { ValidationErrors } from "../interfaces/IValidationErrors";

const useValidation = (
  value: string,
  validations: Validation
): ValidationErrors => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(Infinity);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.trim().length < (validations.minLength ?? 0)
            ? setMinLengthError(true)
            : setMinLengthError(false);
          setMinLength(validations.minLength ?? 0);
          break;
        case "maxLength":
          value.trim().length > (validations.maxLength ?? Infinity)
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          setMaxLength(validations.maxLength ?? Infinity);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "email":
          emailReg.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [validations, value]);

  useEffect(() => {
    if (!isEmpty && !minLengthError && !maxLengthError && !emailError) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
    minLength,
    maxLength,
  };
};

export default useValidation;
