import List from '@/components/list/List';
import { GetStaticProps, NextPage } from 'next';
import { getAllCountriesListData } from '@/libs/countries-utils';
import { CountryType } from '@/types';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ListHeader from '@/components/list/ListHeader';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

const Homepage: NextPage<{ countries: CountryType[] }> = ({ countries }) => {
  const [countriesData, setCountriesData] = useState<CountryType[] | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const searchCountriesHandler = (value: string): void => setSearchValue(value);
  const filteredCountries: CountryType[] = countries.filter((country: CountryType) =>
    country.name.common.toLowerCase().includes(searchValue)
  );

  useEffect(() => {
    if (countries.length) {
      setCountriesData(countries);
    }
  }, [countries]);

  const countriesHtml = filteredCountries.length ? (
    <List countries={filteredCountries} />
  ) : (
    <p className='text-center fond-bold'>No countries found.</p>
  );

  return (
    <Layout>
      <ListHeader onSearch={searchCountriesHandler} />
      <div className='pt-48'>{countriesData ? countriesHtml : <LoadingSpinner />}</div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const countries = await getAllCountriesListData();

  return {
    props: { countries },
    revalidate: 3600000,
  };
};

export default Homepage;
