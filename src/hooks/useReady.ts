import { useEffect, useState } from "react";

export const useReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      setIsReady(true);
    }
  }, []);

  return isReady;
};
