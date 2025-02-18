import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import Message from "./message";

type Props = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  format: string;
  textFieldProps?: Record<string, string>;
  disableOpenPicker: boolean;
  error?: string;
  disabled?: boolean;
  name: string;
};

const Date = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label = "",
      value,
      name,
      onChange,
      format = "DD/MM/YYYY",
      textFieldProps = {},
      disableOpenPicker = false,
      error,
      disabled,
    }: Props,
    ref
  ) => (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      <DatePicker
        label={label}
        disabled={disabled}
        name={name}
        format={format}
        value={value ? dayjs(value,format) : null}
        onChange={(date) => {
          if (date?.isValid()) {
            onChange?.(date.format(format));
          } else {
            onChange("");
          }
        }}
        slotProps={{
          textField: {
            size: "small",
            inputRef: ref,
            error: Boolean(error),
            helperText: <Message value={error} />,
            ...textFieldProps,
          },
        }}
        disableOpenPicker={disableOpenPicker}
      />
    </LocalizationProvider>
  )
);

Date.displayName = "Date";

export default Date;
