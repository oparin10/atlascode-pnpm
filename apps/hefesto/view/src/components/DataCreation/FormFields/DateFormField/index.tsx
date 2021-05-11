import React from "react";
import { FormFieldComponentProps } from "../Root";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { isValid } from "date-fns/esm";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Event } from "@material-ui/icons";

const DateFormField = ({
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
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
        <DatePicker
          clearable
          disablePast
          helperText={helperText}
          inputVariant="outlined"
          error={Boolean(helperText)}
          label={label}
          name={name}
          onBlur={onBlur}
          clearLabel="Limpar"
          okLabel={"Confirmar"}
          cancelLabel={"Cancelar"}
          onChange={(date: MaterialUiPickersDate) => {
            if (!isValid(date)) {
              setFieldError(name, "É preciso inserir uma data válida");
              setFieldTouched(name, true, true);
            }

            setFieldValue(name, date?.toJSON(), true);
          }}
          value={value}
          // placeholder={"10/10/2018"}
          // minDate={new Date()}

          format={"dd/MM/yyyy"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Event />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};
export default DateFormField;
