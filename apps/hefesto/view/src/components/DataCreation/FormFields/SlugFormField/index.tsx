import { TextField } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import converToSlug, {
  convertToSlugRegExp,
} from "../../../../helper/convertToSlug";
import { FormFieldComponentProps } from "../Root";

const SlugFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  validateField,
  value,
  error,
}: FormFieldComponentProps) => {
  const handleBlur = (
    blurEvent:
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
      | undefined
  ) => {
    onBlur(blurEvent);
    setFieldValue(name, slugify(value), true);
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(
          name,
          slugify(event.target.value, {
            lower: true,
            strict: true,
            replacement: "-",
          }),
          false
        )
      }
      onBlur={onBlur}
      id={id}
      error={error}
      helperText={helperText}
    />
  );
};

export default SlugFormField;
