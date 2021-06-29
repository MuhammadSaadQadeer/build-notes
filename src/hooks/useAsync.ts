import { useEffect, useState } from "react";

export function useAsync(fn: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [responseValue, setResponseValue] = useState();
  const [error, setError] = useState();

  const execute = (url?: string) => {
    return fn(url)
      .then((result: any) => {
        result.json().then((response: any) => {
          setResponseValue(response);
          setIsLoading(false);
        });
      })
      .catch((error: any) => {
        setError(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
  }, [responseValue]);
  return [execute, responseValue, isLoading, error];
}
