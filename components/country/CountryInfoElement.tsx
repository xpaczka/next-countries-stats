import { FC } from 'react';

interface CountryInfoElementProps {
  name: string;
  value: string;
}

const CountryInfoElement: FC<CountryInfoElementProps> = ({ name, value }) => {
  return (
    <div className='flex items-center justify-between border-b border-solid border-gray-300 py-3 px-5 mb-3'>
      <p className='font-bold pr-5'>{name}</p>
      <p className='text-right'>{value}</p>
    </div>
  );
};

export default CountryInfoElement;
