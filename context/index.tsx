import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { CountryProps } from '@/types';
import { getAllCountriesListData } from '@/libs/countries-utils';

interface Context {
  countries: CountryProps[];
  filteredCountries: CountryProps[];
  filterCountries: (value: string) => void;
}

export const CountriesContext = createContext<Context>({
  countries: [],
  filteredCountries: [],
  filterCountries: (value: string) => {},
});

const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryProps[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      const data = await getAllCountriesListData();
      if (!data) return;

      setCountries(data);
    };

    getData();
    return () => abortController.abort();
  }, []);

  const filterCountries = (value: string) => {
    const filter = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
    setFilteredCountries(filter);
  };

  const context = {
    countries,
    filteredCountries,
    filterCountries,
  };

  return <CountriesContext.Provider value={context}>{children}</CountriesContext.Provider>;
};

export default CountriesProvider;
