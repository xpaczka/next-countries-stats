import { useState, useEffect } from 'react';

const useFetch = (fetchingFunction: Function) => {
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
  }, [isLoading, error]);

  return { data, isLoading, error };
};

export default useFetch;
