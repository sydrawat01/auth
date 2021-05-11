import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const sendRequest = useCallback(async (reqConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : 'GET',
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        headers: reqConfig.headers ? reqConfig.headers : {},
      });
      const data = response.json();
      if (!response.ok) {
        let errorMessage = 'unknown error occurred!';
        if (data.error) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    responseData,
    sendRequest,
  };
};
