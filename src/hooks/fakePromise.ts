import { useEffect, useState } from "react";
import { ActionType, Invoice } from "../lib/types/invoice";
import useStorage from "./useStorage";

const useFakePromise = () => {
  const { setInvoices, updateInvoices } = useStorage();
  const [state, setState] = useState({
    isLoading: false,
    success: false,
    error: false,
  });

  const handleMutate = async (value: Invoice, type: ActionType) => {
    if (value) {
      switch (type) {
        case "add": {
          await handlePromise(() => setInvoices(value));
          break;
        }
        case "update": {
          await handlePromise(() => updateInvoices(value));
          break;
        }
      }
    }
  };

  let promiseTimeout: NodeJS.Timeout;

  const handlePromise = (execute: () => void) =>
    new Promise<void>((resolve, reject) => {
      setState({ isLoading: true, success: false, error: false });

      promiseTimeout = setTimeout(() => {
        // const shouldResolve = Math.random() < 0.5; //change this to make it success or error
        const shouldResolve = true;
        if (shouldResolve) {
          execute();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
