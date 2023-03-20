import List from '@/components/list/List';
import { GetStaticProps, NextPage } from 'next';
import { getAllCountries } from '@/libs/countries-utils';
import { CountryType, CountryTypeExtended } from '@/types';
import { useEffect, useState } from 'react';
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

  const metadata = <Head>
      <title>Next Countries Stats</title>
      <meta name="description" content="See information about all countries"></meta>
    </Head>

  if (fetchingFailed && !countriesData) {
    return (
      <>
        {metadata}
        <Layout>
          <ListHeader countriesFound={filteredCountries.length} onSearch={searchCountriesHandler} />
          <p className='pt-48 sm:pt-52 text-center font-bold'>No data available.</p>
        </Layout>
      </>
    );
  }

  const countriesHtml = filteredCountries.length ? (
    <List countries={filteredCountries} />
  ) : (
    <p className='text-center fond-bold'>No countries found.</p>
  );

  return (
    <>
      {metadata}
      <Layout>
        <ListHeader countriesFound={filteredCountries.length} onSearch={searchCountriesHandler} />
        <div className='pt-48 sm:pt-52 pb-10'>{countriesData ? countriesHtml : <LoadingSpinner />}</div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllCountries();
  const countries = data?.map((data: CountryTypeExtended) => {
    return {
      cca2: data.cca2,
      name: data.name,
      flags: data.flags,
      population: data.population,
      area: data.area,
      capital: data.capital,
      url: data.url
    };
  });

  return {
    props: { countries: countries || [] },
    revalidate: 3600000,
  };
};

export default Homepage;
