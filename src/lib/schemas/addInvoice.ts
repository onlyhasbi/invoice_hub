import { z } from "zod";

export const addInvoiceSchema = z.object({
  name: z.string().nonempty("Name is required"),
  due_date: z.string().nonempty("Due date is required"),
  status: z.string().nonempty("Status is required"),
  invoice_number: z.string().refine((val) => val.startsWith("INV-"), {
    message: "Invoice number must start with 'INV-'",
  }),
  amount: z.string().nonempty("Amount is required"),
});
