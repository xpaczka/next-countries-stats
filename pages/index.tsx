import List from '@/components/list/List';
import { GetServerSideProps, NextPage } from 'next';
import { getAllCountriesListData } from '@/libs/countries-utils';
import { CountryProps } from '@/types';
import { useContext } from 'react';
import { CountriesContext } from '@/context';

const Homepage: NextPage<{ countries: CountryProps[] }> = ({ countries }) => {
  const { isSorted, isFiltered, filteredCountries, sortedCountries } = useContext(CountriesContext);

  if (isSorted && sortedCountries) {
    return <List countries={sortedCountries} />;
  }

  if (isFiltered && filteredCountries) {
    return filteredCountries.length ? (
      <List countries={filteredCountries} />
    ) : (
      <p className='text-center font-bold'>No countries found</p>
    );
  }

  return <List countries={countries} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const countries = await getAllCountriesListData();

  return {
    props: { countries },
  };
};

export default Homepage;
