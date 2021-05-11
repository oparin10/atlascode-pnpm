import {
  Button,
  Fade,
  Grow,
  ListItemAvatar,
  Slide,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { FieldArray, Form } from "formik";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { indexOf } from "lodash";
import { nanoid } from "nanoid";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import { TextFieldWrapper } from "../TextFormField";
import ListBaseFormFieldLayout, { ListFormItemLayout } from "./styles";

const StringArrayFormField = ({
  name,
  helperText,
  id,
  label,
  onBlur,
  onChange,
  setFieldValue,
  value,
  error,
  listOptions,
}: FormFieldComponentProps) => {
  const handleAddNewField = () => {
    setFieldValue(name, [...value, ""], false);
  };

  const handleRemoveLast = () => {
    let currentValueArray: any[] = [...value];

    currentValueArray.pop();

    setFieldValue(name, [...currentValueArray], false);
  };

  const handleRemoveAtIndex = (indexArg: number) => {
    let currentFieldArray: any[] = [...value];

    currentFieldArray.splice(indexArg, 1);

    console.log(currentFieldArray);

    setFieldValue(name, [...currentFieldArray], true);
  };

  return (
    <ListBaseFormFieldLayout
      label={listOptions?.label ?? ""}
      insertField={handleAddNewField}
    >
      {(value as any[]).length > 0 ? (
        (value as any[]).map((value, index: number) => {
          return (
            <motion.div
              key={index}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0, x: -100 }}
            >
              <ListFormItemLayout
                removeField={() => handleRemoveAtIndex(index)}
              >
                <TextField
                  helperText={helperText}
                  error={error}
                  value={`${value}`}
                  name={`${name}.${index}`}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(`${name}.${index}`, event.target.value)
                  }
                  style={{
                    minWidth: "75%",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  label={listOptions?.fieldLabel ?? ""}
                />
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

export default StringArrayFormField;
