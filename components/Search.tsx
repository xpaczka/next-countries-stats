import { CountriesContext } from '@/context';
import { ChangeEvent, useContext, useState } from 'react';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const { filterCountries } = useContext(CountriesContext);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    filterCountries(e.target.value);
  };

  return (
    <div>
      <input
        type='text'
        className='bg-green-200 rounded-md py-3 px-5'
        placeholder='Search for country, capital, region, etc.'
        value={searchValue}
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
