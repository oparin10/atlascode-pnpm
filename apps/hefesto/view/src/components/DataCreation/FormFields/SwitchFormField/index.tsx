import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@material-ui/core";
import React from "react";
import { FormFieldComponentProps } from "../Root";

const SwitchFormField = ({
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
}: FormFieldComponentProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={value || false}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => {
                checked
                  ? setFieldValue(name, true, false)
                  : setFieldValue(name, false, false);
              }}
              name={name}
            />
          }
          labelPlacement="end"
          label={value ? "Ativo" : "Inativo"}
          style={{ color: "rgba(0, 0, 0, 0.54)" }}
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchFormField;
