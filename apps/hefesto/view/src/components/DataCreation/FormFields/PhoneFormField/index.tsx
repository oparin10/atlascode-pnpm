import { TextField } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { FormFieldComponentProps } from "../Root";
import { TextFieldWrapper } from "../TextFormField";

interface Props {}

const PhoneFormField = ({
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
}: FormFieldComponentProps) => {
  const handlePhoneValueChange = (value: any) => {
    setFieldValue(name, value, true);
  };

  return (
    <TextFieldWrapper>
      <NumberFormat
        format={"(##) #-####-####"}
        variant="outlined"
        value={value}
        name={name}
        customInput={TextField}
        label={label}
        id={id}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        onValueChange={({ floatValue, formattedValue, value }) =>
          handlePhoneValueChange(formattedValue)
        }
      />
    </TextFieldWrapper>
  );
};

export default PhoneFormField;
