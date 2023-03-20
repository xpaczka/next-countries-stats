import { CountryType, CountryTypeExtended } from '@/types';

const createCountryLink = (name: string): string => {
  const formmatedName = name.toLowerCase().replaceAll(' ', '-');
  return `/${formmatedName}`;
};

export const getAllCountries = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=cca2,name,flags,population,area,capital,region,subregion,languages,currencies,capitalInfo,independent'
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    const filteredCountries = data.filter((country: { independent: boolean }) => country.independent === true);
    const sortedCountries = filteredCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
    const countryData = sortedCountries.map((country: CountryTypeExtended) => ({...country, url: createCountryLink(country.name.common)}))

    return countryData;
  } catch (err) {
    console.error(err);
  }
};

export const getAllCountriesUrl = async (): Promise<string[]> => {
  const countries = await getAllCountries();
  const links = countries?.map((country: CountryType) => country.url);

  return links;
};

export const getSingleCountryFromUrl = async (url: string): Promise<CountryTypeExtended> => {
  const countries = await getAllCountries();
  const formattedUrl = url.slice(1).replace('-', ' ');
  const country = countries?.find((country: CountryType) => country.url === formattedUrl);

  return country;
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
