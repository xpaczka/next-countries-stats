import { ChangeEvent, FC } from 'react';
import ListCategory from './ListCategory';

const Header: FC<{ onSearch: Function }> = ({ onSearch }) => {
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value.toLowerCase());

  return (
    <div className='container fixed left-1/2 transform -translate-x-1/2 pb-5 py-10 bg-white'>
      <div className='sm:mb-10 sm:flex justify-between'>
        <div className='text-center sm:text-left text-2xl font-bold uppercase mb-5'>Countries Stats</div>
        <div>
          <input
            type='text'
            className='bg-blue-50 rounded-md py-3 px-5 w-full sm:w-64'
            placeholder='Search for a country'
            onChange={searchHandler}
          />
        </div>
      </div>
      <div className='hidden sm:flex items-center justify-between pr-5'>
        <div className='flex-1'>Country Name</div>
        <ListCategory name='Capital' className='w-48 hidden md:block' />
        <ListCategory name='Population' className='w-28 sm:w-36' />
        <ListCategory name='Area' className='w-28 sm:w-36' />
      </div>
    </div>
  );
};

export default Header;
