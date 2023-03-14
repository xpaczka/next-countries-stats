export interface CountryType {
  cca2?: string;
  name: { common: string };
  flags: { svg: string; alt: string };
  population: number;
  area: number;
  capital: string[];
  [key: string]:
    | string
    | number
    | undefined
    | { common: string }
    | { svg: string; alt: string }
    | string[]
    | Record<string, unknown>;
}

export interface CountriesContextType {
  isSorted: boolean;
  isFiltered: boolean;
  countries: CountryType[] | undefined;
  filteredCountries: CountryType[] | undefined;
  sortedCountries: CountryType[] | undefined;
  filterCountries: (value: string) => void;
  sortCountriesByCategory: (category: string, direction: boolean | null) => void;
}
