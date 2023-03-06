import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { CountryProps } from '@/types';

/* TODO:
-> fix searchbar issue
-> add countries sorting by property
*/

interface ContextProps {
  countries: CountryProps[];
  filterCountries: (input: string) => void;
}

export const CountriesContext = createContext<ContextProps>({
  countries: [],
  filterCountries: (input: string) => {},
});

const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const sortedCountries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
      setCountries(sortedCountries);
    };

    fetchCountries();
  });

  const filterCountries = (input: string) => {
    if (input === '') setFilteredCountries(countries);

    const filtered = countries.filter((el: CountryProps) =>
      el.name.common.toLowerCase().includes(input.toLowerCase().trim())
    );
    setFilteredCountries(filtered);
  };

  const context = {
    countries: filteredCountries.length ? filteredCountries : countries,
    filterCountries: filterCountries,
  };

  return <CountriesContext.Provider value={context}>{children}</CountriesContext.Provider>;
};

export default CountriesProvider;
