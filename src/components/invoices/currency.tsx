import React from "react";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

const Currency = React.forwardRef<
  HTMLElement,
  UseFormRegisterReturn & { itemProp: string }
>((register, ref) => (
  <FormControl
    id="amount"
    variant="outlined"
    size="small"
    className="pl-20"
    error={Boolean(register.itemProp)}
    fullWidth
  >
    <OutlinedInput
      placeholder="Enter your invoice amount"
      startAdornment={
        <>
          <InputAdornment position="start" className="z-10 w-24" />
          <span className="font-light rounded-l absolute left-0 top-0 bg-[#D9D9D9] text-[#64748B] w-20 h-full flex justify-center items-center">
            Rp
          </span>
        </>
      }
      {...register}
      inputRef={ref}
    />
  </FormControl>
));

Currency.displayName = "Currency";

export default Currency;
