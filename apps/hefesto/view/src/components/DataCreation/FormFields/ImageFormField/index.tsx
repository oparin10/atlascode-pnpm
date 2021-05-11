import { TextField } from "@material-ui/core";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import ImageFieldComponentBase from "./styles";

interface Props {}

const ImageFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  value,
  error,
}: FormFieldComponentProps) => {
  return (
    <ImageFieldComponentBase
      blurFn={onBlur}
      error={error}
      helperText={helperText}
      label={label}
      changeFn={onChange}
      value={value}
      name={name}
    />
  );
};

export default ImageFormField;
