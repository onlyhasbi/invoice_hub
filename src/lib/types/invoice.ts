export type Invoice = {
  name: string;
  due_date: string;
  status: string;
  invoice_number: string;
  amount: string;
};


export type PromiseStatus = "success" | "error";