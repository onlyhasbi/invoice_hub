import { useEffect, useState } from "react";
import { Invoice } from "../lib/types/invoice";

const STORAGE = "invoices";

function useStorage() {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);

  const handleSetInvoice = (data?: Invoice) => {
    if (!data) return;
    setInvoices((prev) => {
      const updated = [...prev, data];
      localStorage.setItem(STORAGE, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const invoiceStorage = localStorage.getItem(STORAGE);
    if (invoiceStorage) {
      setInvoices(JSON.parse(invoiceStorage));
    }
  }, []);

  return { invoices, setInvoices: handleSetInvoice };
}

export default useStorage;
