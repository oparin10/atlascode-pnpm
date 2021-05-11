import React from "react";
import Radio from "@material-ui/core/Radio";
import { FormFieldComponentProps } from "../Root";
import { RadioField } from "@hefesto/types";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";

const RadioFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  setFieldValue,
  value,
  error,
  selectValues,
  radioOptions = [],
}: FormFieldComponentProps) => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <FormControl error={error} component="fieldset">
        <FormLabel>{label}</FormLabel>
        <FormGroup>
          {radioOptions?.map((radioOption: RadioField, index: number) => {
            return (
              <FormControlLabel
                key={index}
                label={radioOption.label}
                control={
                  <Radio
                    checked={radioOption.value == value}
                    onChange={onChange}
                    name={name}
                    value={radioOption.value}
                  />
                }
              />
            );
          })}
        </FormGroup>
        {error ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    </div>
  );
};

export default RadioFormField;
