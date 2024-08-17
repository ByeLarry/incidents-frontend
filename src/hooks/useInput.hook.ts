import { useState } from "react";
import useValidation from "./useValidation.hook";
import { Validation } from "../interfaces/IValidators";
import { InputHookReturn } from "../interfaces/IInputHookReturn";

const useInput = (
  initialValue: string,
  validations: Validation
): InputHookReturn => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };
  return {
    value,
    setDirty,
    setValue,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
export default useInput;
