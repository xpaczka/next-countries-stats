// TODO -> switch to redux
// TODO -> also filter for capital, region, etc...

import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { CountryType, CountriesContextType } from '@/types';
import { getAllCountriesListData } from '@/libs/countries-utils';
import useFetch from '@/hooks/useFetch';

interface ActionFetchCountries {
  type: 'FETCH_COUNTRIES';
  payload: CountryType[] | undefined;
}

interface ActionFilter {
  type: 'FILTER';
  payload: string;
}

interface ActionSort {
  type: 'SORT';
  payload: { category: keyof CountryType; direction: boolean | null };
}

type ActionType = ActionFetchCountries | ActionFilter | ActionSort;

export const initialCountriesState: CountriesContextType = {
  isSorted: false,
  isFiltered: false,
  countries: [],
  filteredCountries: [],
  sortedCountries: [],
  filterCountries: (value: string) => {},
  sortCountriesByCategory: (category: string, direction: boolean | null) => {},
};

export const countriesReducer = (state: CountriesContextType, action: ActionType) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES':
      return { ...state, countries: action.payload };
    case 'FILTER':
      if (action.payload === '') {
        return { ...state, isFiltered: false, isSorted: false };
      } else {
        const filteredCountries = state.countries?.filter((country: CountryType) =>
          country.name.common.toLowerCase().includes(action.payload.toLowerCase())
        );
        return { ...state, isFiltered: true, isSorted: false, filteredCountries };
      }
    case 'SORT':
      const { category, direction } = action.payload;
      let isSorted: boolean = false;

      if (direction === null || direction) {
        isSorted = true;
      }

      const sortedCountries = state.countries?.slice().sort((a: CountryType, b: CountryType) => {
        if (action.payload.direction === null) {
          return Number(a[category]) - Number(b[category]);
        } else if (direction) {
          return Number(b[category]) - Number(a[category]);
        } else {
          return 0;
        }
      });

      return { ...state, isSorted, sortedCountries };
    default:
      return state;
  }
};

export const CountriesContext = createContext<CountriesContextType>(initialCountriesState);

const CountriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [countriesState, dispatchCountriesState] = useReducer(countriesReducer, initialCountriesState);
  const { data: countries } = useFetch<CountryType[]>(getAllCountriesListData);

  useEffect(() => dispatchCountriesState({ type: 'FETCH_COUNTRIES', payload: countries }), []);

  const filterCountries = (value: string): void => dispatchCountriesState({ type: 'FILTER', payload: value });
  const sortCountriesByCategory = (category: keyof CountryType, direction: boolean | null): void =>
    dispatchCountriesState({ type: 'SORT', payload: { category, direction } });

  const context = {
    ...countriesState,
    filterCountries,
    sortCountriesByCategory,
  };

  return <CountriesContext.Provider value={context}>{children}</CountriesContext.Provider>;
};

export default CountriesProvider;
