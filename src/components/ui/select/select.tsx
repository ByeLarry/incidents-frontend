import { useEffect, useState } from "react";
import "./select.scss";

interface Props {
  id?: string;
  name?: string;
  values: string[];
  required?: boolean;
  isCategories?: boolean;
  width?: number | string;
  disabled?: boolean;
  setCheckedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SelectComponent: React.FC<Props> = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (!selectedValue) setSelectedValue(props.values[0]);
  }, [props.values, selectedValue]);

  useEffect(() => {
    props.setCheckedValue(selectedValue);
  }, [props, selectedValue]);

  return (
    <>
      <select
        className={`select`}
        id={props.id}
        name={props.name}
        required={props.required}
        onChange={handleChange}
        defaultValue={props.values?.[0]}
        style={{
          width: props.width,
        }}
        disabled={props.disabled}
      >
        {props.values?.map((value) => (
          <option key={value} className="option" value={value}>
            {value}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </>
  );
};
