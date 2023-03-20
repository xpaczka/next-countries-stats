import { CountryType, CountryTypeExtended } from '@/types';

export const createCountryLink = (name: string): string => {
  const formmatedName = name.toLowerCase().replaceAll(' ', '-');
  return `/${formmatedName}`;
};

export const getAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    const filteredCountries = data.filter((country: { independent: boolean }) => country.independent === true);
    const sortedCountries = filteredCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

    return sortedCountries;
  } catch (err) {
    console.error(err);
  }
};

export const getAllCountriesListData = async (): Promise<CountryType[] | undefined> => {
  try {
    const allData = await getAllCountries();

    if (!allData) {
      throw new Error('Something went wrong');
    }

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
  } catch (err: any) {
    console.error(err);
  }
};

export const getAllCountriesUrl = async (): Promise<string[]> => {
  const countries = await getAllCountries();
  const links = countries?.map((country: CountryType) => country.name.common.toLowerCase().replaceAll(' ', '-').trim());

  return links;
};

export const getSingleCountryFromUrl = async (url: string) => {
  const countries = await getAllCountries();
  const formattedUrl = url.slice(1).replaceAll('-', ' ');
  const country = countries?.find(
    (country: { name: { common: string } }) => country.name.common.toLowerCase() === formattedUrl
  );

  return country;
};

export const getBorderingCountries = async (borders: string[]): Promise<CountryType[] | undefined> => {
  if (!borders) return;

  const countries = await getAllCountries();
  const borderingCountries = [];

  for (const border of borders) {
    const borderingCountry = countries.find((country: CountryTypeExtended) => country.cca3 === border);
    borderingCountries.push(borderingCountry);
  }

  return borderingCountries as CountryType[];
};

export const getCurrentTime = async (lat: number, lng: number): Promise<string> => {
  const locale = navigator.language;
  const timestamp = Math.floor(Date.now() / 1000);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );
  const data = await response.json();

  const currentTime = new Date().toLocaleString(locale, {
    timeZone: data.timeZoneId,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return currentTime;
};
