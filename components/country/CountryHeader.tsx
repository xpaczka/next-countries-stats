import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentTime } from '@/libs/countries-utils';

interface CountryHeaderProps {
  name: {
    common: string;
    official: string;
    nativeName: object;
  };
  img: string;
  alt: string;
  timezone: string;
}

const CountryHeader: FC<CountryHeaderProps> = ({ name, img, alt, timezone }) => {
  const nativeName: string = Object.values(name.nativeName)[0].official;
  const [currentTime, setCurrentTime] = useState<string>('');
  const formattedTimezone = timezone.slice(3).split(':');

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getCurrentTime(formattedTimezone);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-blue-50 p-10 w-1/3 rounded-md flex flex-col items-center text-center'>
      <Image
        src={img}
        alt={alt}
        className='rounded-lg object-contain border border-solid border-black mb-5'
        width={160}
        height={120}
      />
      <h1 className='text-xl font-bold mb-4'>{name.common}</h1>
      <div className='mb-5'>
        <p>{nativeName}</p>
        <p>{name.official}</p>
      </div>
      <div>
        {currentTime && (
          <>
            <p className='font-bold'>Current time</p>
            <p>{currentTime}</p>
            <p className='text-xs'>({timezone})</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CountryHeader;
