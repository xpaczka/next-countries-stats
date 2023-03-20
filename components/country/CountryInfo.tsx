import { CountryType } from '@/types';
import { FC } from 'react';
import CountryBorders from './CountryBorders';
import CountryInfoElement from './CountryInfoElement';

interface CountryInfoProps {
  capital: string;
  continent: string;
  subregion: string;
  languages: object;
  population: number;
  area: number;
  currency: object;
  borders: CountryType[];
}

interface CurrencyType {
  name: string;
  symbol: string;
}

const CountryInfo: FC<CountryInfoProps> = ({ capital, continent, subregion, languages, population, area, currency, borders }) => {
  const formattedLanguages: string = Object.values(languages).join(', ');
  const formattedPopulation: string = population.toLocaleString('en-US').replaceAll(',', ' ');
  const formattedArea: string = area.toLocaleString('en-US').replaceAll(',', ' ');

  const { name: currencyName, symbol: currencySymbol }: CurrencyType = Object.values(currency)[0];
  const formattedCurrency = `${currencySymbol} ${currencyName}`;

  return (
    <div className='py-10 px-5 rounded-b-md md:rounded-md bg-blue-50 w-full md:w-2/3'>
      <CountryInfoElement name='Capital' value={capital} />
      <CountryInfoElement name='Continent' value={continent} />
      <CountryInfoElement name='Subregion' value={subregion} />
      <CountryInfoElement name='Languages' value={formattedLanguages} />
      <CountryInfoElement name='Population' value={formattedPopulation} />
      <CountryInfoElement name='Area' value={formattedArea} />
      <CountryInfoElement name='Currency' value={formattedCurrency} />
      {borders.length ? <CountryBorders borders={borders} /> : ''}
    </div>
  );
};

export default CountryInfo;
