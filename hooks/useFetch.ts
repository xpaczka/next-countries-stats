import { useState, useEffect } from 'react';

interface FetchHookReturn {
  data: any;
  isLoading: boolean;
  error: string | undefined;
}

const useFetch = (fetchingFunction: Function): FetchHookReturn => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      setIsLoading(true);

      try {
        const fetchedData = await fetchingFunction();
        setData(fetchedData);
      } catch (err: any) {
        setError('Something went wrong');
      }

      setIsLoading(false);
    };

    getData();
    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
};

export default useFetch;
