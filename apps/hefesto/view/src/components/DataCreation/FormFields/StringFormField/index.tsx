import { TextField } from "@material-ui/core";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import { TextFieldWrapper } from "../TextFormField";

const StringFormField = ({
  formFieldType,
  label,
  name,
  value = "",
  onChange,
  error,
  helperText,
  id,
  onBlur,
  ...props
}: FormFieldComponentProps) => {
  return (
    <TextFieldWrapper>
      <TextField
        onBlur={onBlur}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        error={error ? true : false}
        helperText={helperText}
      />
    </TextFieldWrapper>
  );
};

export default StringFormField;
