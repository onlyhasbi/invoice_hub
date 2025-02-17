import { useEffect, useState } from "react";
import { Invoice, PromiseStatus } from "../lib/types/invoice";
import useStorage from "./useStorage";

const useFakePromise = () => {
  const { setInvoices } = useStorage();
  const [state, setState] = useState({
    isLoading: false,
    success: false,
    error: false,
  });

  const handleMutate = async (value: Invoice) => {
    if (value) {
      await handlePromise(value);
    }
  };

  let promiseTimeout: NodeJS.Timeout;

  const handlePromise = (invoiceData: Invoice) =>
    new Promise<void>((resolve, reject) => {
      setState({ isLoading: true, success: false, error: false });

      promiseTimeout = setTimeout(() => {
        const shouldResolve = Math.random() < 0.5; //change this to make it success or error
        if (shouldResolve) {
          setInvoices(invoiceData);
          resolve();
          setState({ isLoading: false, success: true, error: false });
        } else {
          setState({ isLoading: false, success: false, error: true });
          reject();
        }
      }, 2000);
    });

  useEffect(() => {
    return () => clearTimeout(promiseTimeout);
  }, []);

  return {
    mutate: handleMutate,
    isLoading: state.isLoading,
    status: state.isLoading
      ? undefined
      : state.success
      ? "success"
      : state.error
      ? "error"
      : undefined,
  };
};

export default useFakePromise;
