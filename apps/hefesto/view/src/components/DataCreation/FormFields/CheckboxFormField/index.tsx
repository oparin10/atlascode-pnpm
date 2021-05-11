import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FormFieldComponentProps } from "../Root";
import { CheckboxField } from "@hefesto/types";
import { FormHelperText } from "@material-ui/core";

const CheckboxFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  setFieldValue,
  setFieldError,
  validateField,
  setFieldTouched,
  value,
  error,
  radioOptions,
  selectValues,
  checkboxOptions = [],
}: FormFieldComponentProps) => {
  const setCheck = (newValue: any) => {
    setFieldValue(name, [...value, newValue], true);
  };

  const setUncheck = (removedValue: any) => {
    setFieldValue(
      name,
      value.filter((values: any, index: number) => {
        return values !== removedValue;
      }),
      true
    );
  };

  const handleCheckbox = (checked: boolean, checkboxValue: any) => {
    checked ? setCheck(checkboxValue) : setUncheck(checkboxValue);

    setFieldTouched(name, true, true);
  };

  return (
    <FormControl error={error} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position">
        {checkboxOptions.map((checkboxOption: CheckboxField, index: number) => {
          return (
            <FormControlLabel
              key={index}
              value={checkboxOption.value}
              control={
                <Checkbox
                  name={name}
                  checked={value?.includes(checkboxOption.value) || false}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => handleCheckbox(checked, checkboxOption.value)}
                  color="primary"
                />
              }
              label={checkboxOption.label}
            />
          );
        })}
      </FormGroup>
      {error ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default CheckboxFormField;
