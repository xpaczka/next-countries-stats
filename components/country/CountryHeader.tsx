import { FC, useEffect, useState } from 'react';
import { getCurrentTime } from '@/libs/countries-utils';
import Image from 'next/image';

interface CountryHeaderProps {
  name: {
    common: string;
    official: string;
    nativeName: object;
  };
  img: string;
  alt: string;
  latlng: number[];
}

const CountryHeader: FC<CountryHeaderProps> = ({ name, img, alt, latlng }) => {
  const nativeName: string = Object.values(name.nativeName)[0].official;
  const [currentTime, setCurrentTime] = useState<string>('');
  const [lat, lng] = latlng;

  useEffect(() => {
    const interval = setInterval(async () => {
      const time = await getCurrentTime(lat, lng);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-blue-50 p-10 w-full md:w-1/3 rounded-t-md md:rounded-md flex flex-col items-center text-center'>
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
        <p className='font-bold'>Local time</p>
        <p className='h-6'>{currentTime}</p>
      </div>
    </div>
  );
};

export default CountryHeader;
