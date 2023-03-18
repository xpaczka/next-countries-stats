import { FC } from 'react';
import CountryInfoElement from './CountryInfoElement';

interface CountryInfoProps {
  capital: string;
  region: string;
  languages: object;
  population: number;
  area: number;
  currency: object;
}

interface CurrencyType {
  name: string;
  symbol: string;
}

const CountryInfo: FC<CountryInfoProps> = ({ capital, region, languages, population, area, currency }) => {
  const formattedLanguages: string = Object.values(languages).join(', ');
  const formattedPopulation: string = population.toLocaleString('en-US').replaceAll(',', ' ');
  const formattedArea: string = area.toLocaleString('en-US').replaceAll(',', ' ');
  const { name: currencyName, symbol: currencySymbol }: CurrencyType = Object.values(currency)[0];

  return (
    <div className='py-10 px-5 rounded-md bg-blue-50 w-2/3'>
      <CountryInfoElement name='Capital' value={capital} />
      <CountryInfoElement name='Region' value={region} />
      <CountryInfoElement name='Languages' value={formattedLanguages} />
      <CountryInfoElement name='Population' value={formattedPopulation} />
      <CountryInfoElement name='Area' value={formattedArea} />
      <CountryInfoElement name='Currency' value={`${currencySymbol} ${currencyName}`} />
    </div>
  );
};

export default CountryInfo;
