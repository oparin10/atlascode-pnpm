import React from "react";
import {
  FormFieldTypes,
  CheckboxField,
  ListFieldOptions,
  RadioField,
} from "@hefesto/types";
import { FormFieldDictionary } from "../../../../dictionaries";

interface RootFormFieldProps {
  formFieldType: FormFieldTypes;
  label: string;
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  validateField: (field: string) => void;
  onChange: (...args: any[]) => void;
  onBlur: (...args: any[]) => void;
  value: any;
  error?: boolean;
  helperText: any;
  id: string;
  selectValues?: string[];
  radioOptions?: RadioField[];
  checkboxOptions?: CheckboxField[];
  listOptions?: ListFieldOptions | null;
}

export interface FormFieldComponentProps extends RootFormFieldProps {}

const RootFormField = ({
  formFieldType,
  label,
  name,
  onChange,
  onBlur,
  setFieldValue,
  setFieldError,
  validateField,
  setFieldTouched,
  value,
  error,
  helperText,
  id,
  selectValues = [],
  radioOptions = [],
  checkboxOptions = [],
  listOptions,
}: RootFormFieldProps) => {
  const FormFieldDynamic = FormFieldDictionary[formFieldType];

  return (
    <FormFieldDynamic
      validateField={validateField}
      setFieldError={setFieldError}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
      onBlur={onBlur}
      id={id}
      checkboxOptions={checkboxOptions}
      listOptions={listOptions}
      radioOptions={radioOptions}
      error={error}
      value={value}
      onChange={onChange}
      label={label}
      formFieldType={formFieldType}
      name={name}
      selectValues={selectValues}
      helperText={helperText}
    />
  );
};

export default RootFormField;
