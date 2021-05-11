import { TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { FormFieldComponentProps } from "../Root";

export const TextFieldWrapper = styled.div`
  .MuiInputBase-root {
    min-width: 280px;
  }

  @media (min-width: 1024px) {
    .MuiInputBase-root {
      min-width: 400px;
    }
  }
`;

const TextFormField = ({
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
        multiline
        rows={8}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        error={error}
        helperText={helperText}
      />
    </TextFieldWrapper>
  );
};

export default TextFormField;
