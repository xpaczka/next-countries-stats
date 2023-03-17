import { FC } from 'react';
import { CountryType } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

const ListElement: FC<CountryType> = ({ name, capital, flags, population, area, url }) => {
  const formattedPopulation: string = population.toLocaleString('en-US').replaceAll(',', ' ');
  const formattedArea: string = area.toLocaleString('en-US').replaceAll(',', ' ');

  return (
    <li>
      <Link
        href={url}
        className='flex items-center justify-between px-5 py-4 rounded-md mb-4 bg-blue-50 h-16 transition-colors hover:bg-blue-100'
      >
        <div className='flex items-center flex-1'>
          <Image
            src={flags.svg}
            alt={flags.alt || name.common}
            width={48}
            height={36}
            className='rounded-sm w-12 border border-solid border-black'
          />
          <p className='pl-5'>{name.common}</p>
        </div>
        <div className='flex items-center text-center'>
          {capital && <div className='w-48'>{capital[0]}</div>}
          <div className='w-36'>{formattedPopulation}</div>
          <div className='w-36'>{formattedArea}</div>
        </div>
      </Link>
    </li>
  );
};

export default ListElement;
