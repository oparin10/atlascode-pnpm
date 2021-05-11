import { SvgIcon, TextField } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import React from "react";
import NumberFormat from "react-number-format";
import { FormFieldComponentProps } from "../Root";
import ListBaseFormFieldLayout, {
  ListFormItemLayout,
} from "../StringArrayFormField/styles";
import { InstallmentFormFieldWrapper } from "./styles";

const InstallmentsListFormField = ({
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
  listOptions,
  value,
}: FormFieldComponentProps) => {
  const handleInsertField = () => {
    setFieldValue(
      name,
      [...value, { installmentMonths: "", installmentValue: "", id: nanoid() }],
      false
    );
  };

  const handleRemoveAtIndex = (indexArg: number) => {
    let currentFieldArray: any[] = (value as any[]).filter(
      (value, index: number) => {
        return value.id !== indexArg;
      }
    );

    setFieldValue(name, [...currentFieldArray], true);
  };

  console.log(listOptions);

  return (
    <ListBaseFormFieldLayout
      insertField={handleInsertField}
      label={listOptions?.label ?? ""}
    >
      {(value as any[]).length > 0 ? (
        (value as any[]).map((valueInner, index: number) => {
          return (
            <motion.div
              key={valueInner["id"]}
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
            >
              <ListFormItemLayout
                key={index}
                alignCenter
                removeField={() => handleRemoveAtIndex(valueInner["id"])}
              >
                <InstallmentFormFieldWrapper>
                  <NumberFormat
                    key={index}
                    className="installmentNumber"
                    variant="outlined"
                    label="Número de parcelas"
                    isNumericString
                    value={valueInner?.["installmentMonths"]}
                    customInput={TextField}
                    name={`${name}.${index}.installmentMonths`}
                    onValueChange={({ floatValue, formattedValue, value }) => {
                      setFieldValue(
                        `${name}.${index}.installmentMonths`,
                        value
                      );
                    }}
                  />
                  <SvgIcon component={Clear} />

                  <NumberFormat
                    value={valueInner?.["installmentValue"]}
                    name={`${name}.${index}.installmentValue`}
                    onValueChange={({ floatValue, formattedValue, value }) => {
                      setFieldValue(
                        `${name}.${index}.installmentValue`,
                        floatValue
                      );
                    }}
                    className="installmentValue"
                    variant="outlined"
                    label="Valor das parcelas"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    prefix={"R$"}
                    decimalScale={2}
                    customInput={TextField}
                  />
                </InstallmentFormFieldWrapper>
              </ListFormItemLayout>
            </motion.div>
          );
        })
      ) : (
        <div style={{ textAlign: "start" }}>
          Parece que ainda não há nenhum item na lista.
        </div>
      )}
    </ListBaseFormFieldLayout>
  );
};

export default InstallmentsListFormField;
