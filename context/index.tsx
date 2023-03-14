// TODO -> switch to redux
// TODO -> also filter for capital, region, etc...

import { createContext, FC, ReactNode, useState } from 'react';
import { CountryType, CountriesContextType } from '@/types';
import { getAllCountriesListData } from '@/libs/countries-utils';
import useFetch from '@/hooks/useFetch';

export const CountriesContext = createContext<CountriesContextType>({
  isSorted: false,
  isFiltered: false,
  countries: [],
  filteredCountries: [],
  sortedCountries: [],
  filterCountries: (value: string) => {},
  sortCountriesByCategory: (category: string, direction: boolean | null) => {},
});

const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: countries } = useFetch<CountryType[]>(getAllCountriesListData);
  const [filteredCountries, setFilteredCountries] = useState<CountryType[] | undefined>([]);
  const [sortedCountries, setSortedCountries] = useState<CountryType[] | undefined>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const filterCountries = (value: string): void => {
    if (value === '') {
      setIsFiltered(false);
    } else {
      const filter = countries?.filter((country: CountryType) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      );
      setIsFiltered(true);
      setFilteredCountries(filter);
    }
  };

  const sortCountriesByCategory = (category: keyof CountryType, direction: boolean | null): void => {
    if (direction === null || direction) {
      setIsSorted(true);
    } else {
      setIsSorted(false);
    }

    const sorted = countries?.slice().sort((a: CountryType, b: CountryType) => {
      if (direction === null) {
        return Number(a[category]) - Number(b[category]);
      } else if (direction) {
        return Number(b[category]) - Number(a[category]);
      } else {
        return 0;
      }
    });

    setSortedCountries(sorted);
  };

  const context = {
    isSorted,
    isFiltered,
    countries,
    filteredCountries,
    sortedCountries,
    filterCountries,
    sortCountriesByCategory,
  };

  return <CountriesContext.Provider value={context}>{children}</CountriesContext.Provider>;
};

export default CountriesProvider;
