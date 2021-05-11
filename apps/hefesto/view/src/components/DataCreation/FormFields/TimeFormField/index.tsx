import { IconButton, InputAdornment } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import { Alarm } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";

const TimeFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  error,
  onChange,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  validateField,
  value,
}: FormFieldComponentProps) => {
  return (
    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
      <TimePicker
        label={label}
        name={name}
        todayLabel="Agora"
        showTodayButton
        value={value}
        inputVariant="outlined"
        helperText={helperText}
        error={Boolean(helperText)}
        cancelLabel="Cancelar"
        okLabel="Confirmar"
        onChange={(date: MaterialUiPickersDate) =>
          setFieldValue(name, date?.toString(), false)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Alarm />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimeFormField;
