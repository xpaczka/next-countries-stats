// TODO -> fix current time display (displaying wrong time)

import { FC } from 'react';

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
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Capital</p>
        <p>{capital}</p>
      </div>
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Region</p>
        <p>{region}</p>
      </div>
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Languages</p>
        <p>{formattedLanguages}</p>
      </div>
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Population</p>
        <p>{formattedPopulation}</p>
      </div>
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Area</p>
        <p>{formattedArea}</p>
      </div>
      <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
        <p className='font-bold'>Currency</p>
        <p>
          {currencySymbol} {currencyName}
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
