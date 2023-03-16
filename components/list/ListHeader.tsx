import { ChangeEvent, FC } from 'react';
import ListCategory from './ListCategory';

const Header: FC<{ onSearch: Function }> = ({ onSearch }) => {
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value.toLowerCase());

  return (
    <div className='container fixed left-1/2 transform -translate-x-1/2 pb-5 py-10 bg-white'>
      <div className='pl-5 mb-10 flex justify-between'>
        <div>
          <div className='text-2xl font-bold uppercase'>Countries Stats</div>
        </div>
        <div>
          <input
            type='text'
            className='bg-blue-50 rounded-md py-3 px-5'
            placeholder='Search for country, capital, region, etc.'
            onChange={searchHandler}
          />
        </div>
      </div>
      <div className='flex items-center justify-between px-5'>
        <div className='flex-1'>Country Name</div>
        <ListCategory name='Capital' className='w-48' />
        <ListCategory name='Population' className='w-36' />
        <ListCategory name='Area' className='w-36' />
      </div>
    </div>
  );
};

export default Header;
