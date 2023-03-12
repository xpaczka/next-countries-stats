import List from '@/components/list/List';
import { GetServerSideProps, NextPage } from 'next';
import { getAllCountriesListData } from '@/libs/countries-utils';
import { CountryProps } from '@/types';
import { useContext } from 'react';
import { CountriesContext } from '@/context';

const Homepage: NextPage<{ countries: CountryProps[] }> = ({ countries }) => {
  const { filteredCountries, sortedCountries } = useContext(CountriesContext);

  // TODO -> Fix rendering issue - filtering not working
  const countriesValue = sortedCountries.length
    ? sortedCountries
    : filteredCountries.length
    ? filteredCountries
    : countries;

  if (!countriesValue) {
    return <p className='text-center'>No countries found.</p>;
  }

  return <List countries={countriesValue} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const countries = await getAllCountriesListData();

  return {
    props: { countries },
  };
};

export default Homepage;
