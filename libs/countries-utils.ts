import { CountryType } from '@/types';

const createCountryLink = (name: string): string => {
  const formmatedName = name.toLowerCase().replaceAll(' ', '-');
  return `/${formmatedName}`;
};

export const getAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    const filteredCountries = data.filter((country: { independent: boolean }) => country.independent === true);
    const sortedCountries = filteredCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

    return sortedCountries;
  } catch (err) {
    console.error(err);
  }
};

export const getAllCountriesListData = async (): Promise<CountryType[]> => {
  const allData = await getAllCountries();

  const listData = allData?.map((data: CountryType) => {
    return {
      cca2: data.cca2,
      name: data.name,
      flags: data.flags,
      population: data.population,
      area: data.area,
      capital: data.capital,
      url: createCountryLink(data.name.common),
    };
  });

  return listData;
};

export const getNumberOfCountries = async (): Promise<number> => {
  const countries = await getAllCountries();
  if (!countries) return 0;

  return countries.length;
};

export const getAllCountriesUrl = async (): Promise<string[]> => {
  const countries = await getAllCountries();
  const links = countries.map((country: CountryType) => {
    return country.name.common.toLowerCase().replaceAll(' ', '-').trim();
  });

  return links;
};

export const getSingleCountryFromUrl = async (url: string) => {
  const countries = await getAllCountriesListData();
  const formattedUrl = url.slice(1).replace('-', ' ');

  const link = countries.find(country => country.name.common.toLowerCase() === formattedUrl);
  return link;
};
