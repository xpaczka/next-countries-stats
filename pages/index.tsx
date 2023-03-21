import { GetStaticProps, NextPage } from 'next';
import { getAllCountriesListData } from '@/libs/countries-utils';
import { CountryType } from '@/types';
import { useEffect, useState } from 'react';
import List from '@/components/list/List';
import Layout from '@/components/layout/Layout';
import ListHeader from '@/components/list/ListHeader';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import Head from 'next/head';

const Homepage: NextPage<{ countries: CountryType[] }> = ({ countries }) => {
  const [countriesData, setCountriesData] = useState<CountryType[] | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [fetchingFailed, setFetchingFailed] = useState<boolean>(false);
  const searchCountriesHandler = (value: string): void => setSearchValue(value);
  const filteredCountries: CountryType[] = countries.filter((country: CountryType) =>
    country.name.common.toLowerCase().includes(searchValue)
  );

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

  const countriesHtml = filteredCountries.length ? (
    <List countries={filteredCountries} />
  ) : (
    <p className='text-center fond-bold'>No countries found.</p>
  );

  return (
    <>
      <Head>
        <title>Next Countries Stats</title>
        <meta name='description' content='See information about all countries'></meta>
      </Head>
      <Layout>
        <ListHeader countriesFound={filteredCountries.length} onSearch={searchCountriesHandler} />
        <div className='pt-48 sm:pt-52 pb-10'>
          {fetchingFailed && !countriesData ? (
            <p className='pt-48 sm:pt-52 text-center font-bold'>No data available.</p>
          ) : countriesData ? (
            countriesHtml
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </Layout>
    </>
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
