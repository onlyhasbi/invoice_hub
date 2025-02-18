import { useCallback, useEffect, useState } from "react";
import { Invoice } from "../lib/types/invoice";

const STORAGE = "invoices";

function useStorage() {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);

  const handleSetInvoice = (data?: Invoice) => {
    if (!data) return;
    setInvoices((prev) => {
      const updated = [...prev, data];
      localStorage.removeItem(STORAGE);
      localStorage.setItem(STORAGE, JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateInvoice = (data?: Invoice) => {
    if (!data) return;
    setInvoices((prev) => {
      const updated = prev.map((item) =>
        item.invoice_number === data.invoice_number ? data : item
      );
      localStorage.removeItem(STORAGE);
      localStorage.setItem(STORAGE, JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteInvoice = useCallback((value: string) => {
    if (!value) return;
    setInvoices((prev) => {
      const updated = prev.filter((item) => item.invoice_number !== value);
      localStorage.removeItem(STORAGE);
      localStorage.setItem(STORAGE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const invoiceStorage = localStorage.getItem(STORAGE);
    if (invoiceStorage) {
      setInvoices(JSON.parse(invoiceStorage));
    }
  }, []);

  return {
    invoices,
    setInvoices: handleSetInvoice,
    updateInvoices: handleUpdateInvoice,
    deleteInvoice: handleDeleteInvoice,
  };
}

export default useStorage;
