import { FC } from 'react';

interface CountryHeaderProps {
  name: string;
  img: string;
  alt: string;
}

const CountryHeader: FC<CountryHeaderProps> = ({ name, img, alt }) => {
  return (
    <div className='py-10 flex items-start flex-wrap'>
      <div className='w-1/3'>
        <img src={img} alt={alt} className='w-60 rounded-lg' />
      </div>
      <div className='w-2/3'>
        <h1 className='text-3xl font-bold mb-2'>{name}</h1>
      </div>
    </div>
  );
};

export default CountryHeader;
