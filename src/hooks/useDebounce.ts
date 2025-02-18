import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((func: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      func();
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { debounce };
};