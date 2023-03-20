import { createCountryLink } from '@/libs/countries-utils';
import { CountryType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const CountryBorders: FC<{ borders: CountryType[] }> = ({ borders }) => {
  return (
    <div className='p-3 sm:px-5'>
      <p className='font-bold'>Bordering countries ({borders.length})</p>
      <div className='flex flex-wrap'>
        {borders.map((border: CountryType) => {
          const url = createCountryLink(border.name.common);

          return (
            <div key={border.cca2} className='w-full sm:w-1/2 md:w-1/3 sm:px-5 flex flex-col items-center mt-5'>
              <Link href={url} className='hover:opacity-80 transition-opacity h-28 flex items-center'>
                <Image
                  src={border.flags.svg}
                  alt={border.flags.alt || border.name.common}
                  width={120}
                  height={90}
                  className='rounded-lg object-cover h-24 w-32 border border-solid border-black'
                />
              </Link>
              <p className='text-center'>{border.name.common}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountryBorders;
