import { FC } from 'react';
import { CountryProps } from '@/types';

const ListElement: FC<CountryProps> = ({ name, capital, flags, population, area }) => {
  const formattedPopulation = population.toLocaleString('en-US').replaceAll(',', ' ');
  const formattedArea = area.toLocaleString('en-US').replaceAll(',', ' ');

  return (
    <li className='flex items-center justify-between px-5 py-4 rounded-md mb-4 bg-white/50 h-16'>
      <div className='flex items-center flex-1'>
        <img src={flags.svg} alt={flags.alt || name.common} className='rounded-sm w-12' />
        <p className='pl-5'>{name.common}</p>
      </div>
      <div className='flex items-center text-center'>
        {capital && <div className='w-48'>{capital[0]}</div>}
        <div className='w-36'>{formattedPopulation}</div>
        <div className='w-36'>{formattedArea}</div>
      </div>
    </li>
  );
};

export default ListElement;
