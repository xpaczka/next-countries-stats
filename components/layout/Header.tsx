import Search from '../Search';
import ListCategory from '../list/ListCategory';
import { getNumberOfCountries } from '@/libs/countries-utils';
import useFetch from '@/hooks/useFetch';

const Header = () => {
  const { data: countriesNumber } = useFetch<number>(getNumberOfCountries);

  return (
    <div className='container fixed left-1/2 transform -translate-x-1/2 pb-5 py-10 bg-green-400'>
      <div className='pl-5 mb-10 flex justify-between'>
        <div>
          <div className='text-2xl font-bold uppercase'>Countries Stats</div>
          {countriesNumber && <p>{countriesNumber} countries found</p>}
        </div>
        <Search />
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
