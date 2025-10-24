import { useState } from "react";

export const useRequest = <T, K extends unknown[]>(
  apiFunction: (...args: K) => Promise<T>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const execute = async (...args: K): Promise<T> => {
    try {
      setHasError(false);
      setIsLoading(true);

      const data = await apiFunction(...args);

      return data;
    } catch (e) {
      setHasError(true);

      return Promise.reject(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hasError, execute };
};
