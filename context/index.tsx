import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { CountryProps } from '@/types';
import { getAllCountriesListData, sortCountres } from '@/libs/countries-utils';

interface Context {
  countries: CountryProps[];
  filteredCountries: CountryProps[];
  sortedCountries: CountryProps[];
  filterCountries: (value: string) => void;
  sortCountriesByCategory: (category: string, direction: boolean | null) => void;
}

export const CountriesContext = createContext<Context>({
  countries: [],
  filteredCountries: [],
  sortedCountries: [],
  filterCountries: (value: string) => {},
  sortCountriesByCategory: (category: string, direction: boolean | null) => {},
});

const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryProps[]>([]);
  const [sortedCountries, setSortedCountries] = useState<CountryProps[]>([]);

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

  const filterCountries = (value: string): void => {
    const filter = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
    setFilteredCountries(filter);
  };

  const sortCountriesByCategory = (category: keyof CountryProps, direction: boolean | null): void => {
    if (category === 'capital') {
      // sort by capital
    } else {
      const sorted = countries.slice().sort((a: Partial<CountryProps>, b: Partial<CountryProps>) => {
        if (direction === null) {
          return Number(a[category]) - Number(b[category]);
        } else if (direction) {
          return Number(b[category]) - Number(a[category]);
        } else {
          return sortCountres(countries);
        }
      });
      setSortedCountries(sorted);
    }
  };

  const context = {
    countries,
    filteredCountries,
    sortedCountries,
    filterCountries,
    sortCountriesByCategory,
  };

  return <CountriesContext.Provider value={context}>{children}</CountriesContext.Provider>;
};

export default CountriesProvider;
