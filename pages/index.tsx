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
  const [fetchingFailed, setFetchingFailed] = useState<boolean>(false);

  useEffect(() => {
    if (countries.length) {
      setCountriesData(countries);
    }
  }, [countries]);

  useEffect(() => {
    const timetout = setTimeout(() => {
      setFetchingFailed(true);
    }, 10000);

    return () => clearTimeout(timetout);
  }, []);

  if (fetchingFailed && !countriesData) {
    return (
      <Layout>
        <ListHeader onSearch={searchCountriesHandler} />
        <p className='pt-44 sm:pt-48 text-center font-bold'>No data available.</p>
      </Layout>
    );
  }

  const countriesHtml = filteredCountries.length ? (
    <List countries={filteredCountries} />
  ) : (
    <p className='text-center fond-bold'>No countries found.</p>
  );

  return (
    <Layout>
      <ListHeader onSearch={searchCountriesHandler} />
      <div className='pt-44 sm:pt-48 pb-10'>{countriesData ? countriesHtml : <LoadingSpinner />}</div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const countries = await getAllCountriesListData();

  return {
    props: { countries: countries || [] },
    revalidate: 3600000,
  };
};

export default Homepage;
