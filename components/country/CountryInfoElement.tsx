import { FC } from 'react';

interface CountryInfoElementProps {
  name: string;
  value: string;
}

const CountryInfoElement: FC<CountryInfoElementProps> = ({ name, value }) => {
  return (
    <div className='sm:flex items-center justify-between border-b border-solid border-gray-300 p-3 sm:px-5 mb-3'>
      <p className='font-bold pr-5 mb-2 sm:mb-0'>{name}</p>
      <p className='sm:text-right'>{value}</p>
    </div>
  );
};

export default CountryInfoElement;
