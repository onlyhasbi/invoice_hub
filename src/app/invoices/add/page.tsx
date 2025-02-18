"use client";

import Currency from "@/src/components/invoices/currency";
import { inter, openSans } from "@/src/constants/fonts";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import Alert from "@/src/components/invoices/alert";
import Date from "@/src/components/invoices/date";
import Loading from "@/src/components/invoices/loading";
import Message from "@/src/components/invoices/message";
import { addInvoiceMessage } from "@/src/constants/message";
import useFakePromise from "@/src/hooks/fakePromise";
import useStorage from "@/src/hooks/useStorage";
import { addInvoiceSchema } from "@/src/lib/schemas/addInvoice";
import { Invoice, PromiseStatus } from "@/src/lib/types/invoice";
import { getInvoiceNumber } from "@/src/utils/generateInvoiceNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AddInvoice() {
  const { invoices } = useStorage();
  const searchParams = useSearchParams();
  const invoice_number = searchParams.get("invoice_number");
  const newInvoiceNumber = `INV-${getInvoiceNumber()}`;

  const defaultValues = {
    name: "",
    due_date: "",
    status: "",
    invoice_number: newInvoiceNumber,
    amount: "",
  };

  const form = useForm<Invoice>({
    defaultValues: defaultValues,
    resolver: zodResolver(addInvoiceSchema),
  });

  const { mutate, isLoading, status } = useFakePromise();

  const onSubmit: SubmitHandler<Invoice> = async (values) => {
    if (invoice_number) {
      await mutate(values, "update");
    } else {
      await mutate(values, "add");
    }
  };

  useEffect(() => {
    if (status) {
      form.reset();
      form.setValue("invoice_number", newInvoiceNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    let foundInvoice: Invoice | undefined;
    if (invoice_number) {
      foundInvoice = invoices.find(
        (item) => item.invoice_number === invoice_number
      );
    }
    if (foundInvoice) {
      const fieldsToUpdate = [
        "name",
        "amount",
        "status",
        "due_date",
        "invoice_number",
      ];
      fieldsToUpdate.forEach((field) => {
        form.setValue(
          field as keyof Invoice,
          foundInvoice[field as keyof Invoice]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice_number, invoices]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-[38px]">
        <h2
          className={`text-[#1C2434] text-[26px] leading-[30px] ${openSans.className} font-semibold`}
        >
          Add Invoice
        </h2>

        <Paper className="text-left border border-regga bg-white" elevation={3}>
          <h2
            className={`px-6 py-4 text-[#1C2434] ${inter.className} font-semibold`}
          >
            Invoice Form
          </h2>
          <hr />

          <div
            className={`pt-6 px-6 flex items-start gap-9 ${openSans.className}`}
          >
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="required text-sm leading-[22px]"
                >
                  Name
                </label>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        id="name"
                        disabled={isLoading}
                        error={Boolean(error?.message)}
                        helperText={<Message value={error?.message} />}
                        variant="outlined"
                        size="small"
                        placeholder="Enter your invoice name"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </FormControl>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="due_date"
                  className="required text-sm leading-[22px] gap-3"
                >
                  Due Date
                </label>
                <FormControl>
                  <Controller
                    name="due_date"
                    control={form.control}
                    render={({
                      field: { value, name, onChange, ref },
                      fieldState: { error },
                    }) => (
                      <Date
                        format="DD/MM/YYYY"
                        value={value}
                        name={name}
                        onChange={(e) => onChange(e)}
                        error={error?.message}
                        disableOpenPicker
                        disabled={isLoading}
                        ref={ref}
                      />
                    )}
                  />
                </FormControl>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="status"
                  className="required text-sm leading-[22px] gap-3"
                >
                  Status
                </label>
                <FormControl size="small" className="relative">
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        displayEmpty
                        disabled={isLoading}
                        error={Boolean(error?.message)}
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <span className="text-[#a2a2a2] font-light text-sm">
                                Choose the status
                              </span>
                            );
                          }
                          return selected;
                        }}
                      >
                        {["Paid", "Unpaid", "Pending"].map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {form.formState.errors.status?.message && (
                    <Message
                      className="absolute -bottom-6 right-0"
                      value={form.formState.errors.status?.message}
                    />
                  )}
                </FormControl>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="invoice_number"
                  className="required text-sm leading-[22px]"
                >
                  Number
                </label>
                <FormControl>
                  <Controller
                    name="invoice_number"
                    control={form.control}
                    render={({ field }) => (
                      <TextField
                        disabled
                        id="invoice_number"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your invoice number"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </FormControl>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="required text-sm leading-[22px]"
                >
                  Amount
                </label>
                <FormControl size="small">
                  <Controller
                    name="amount"
                    control={form.control}
                    render={({
                      field: { onChange, name, value, onBlur, ref },
                      fieldState: { error },
                    }) => (
                      <>
                        <NumericFormat
                          id="amount"
                          disabled={isLoading}
                          name={name}
                          value={value}
                          customInput={Currency}
                          thousandSeparator="."
                          decimalSeparator=","
                          onBlur={onBlur}
                          getInputRef={ref}
                          itemProp={error ? (error as unknown as string) : ""}
                          onValueChange={(e) =>
                            onChange?.(e.floatValue ? String(e.floatValue) : "")
                          }
                        />
                        {error?.message && <Message value={error.message} />}
                      </>
                    )}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="px-6 flex justify-end my-9">
            <Button
              variant="contained"
              className="w-[259px] !bg-[#3C50E0] !font-light tracking-wide"
              startIcon={
                isLoading ? (
                  <CircularProgress
                    size={12}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null
              }
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              + Add Invoice
            </Button>
          </div>
        </Paper>
        {status && (
          <Alert
            isVisible={Boolean(status)}
            status={
              addInvoiceMessage[status as PromiseStatus]
                ?.status as PromiseStatus
            }
            title={addInvoiceMessage[status as PromiseStatus]?.title}
            message={addInvoiceMessage[status as PromiseStatus]?.message}
          />
        )}
      </div>
    </Suspense>
  );
}

export default AddInvoice;
