import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllCountriesUrl, getSingleCountryFromUrl, getBorderingCountries } from '@/libs/countries-utils';
import { CountryType, CountryTypeExtended } from '@/types';
import { useEffect, useState } from 'react';
import CountryHeader from '@/components/country/CountryHeader';
import CountryInfo from '@/components/country/CountryInfo';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

const CountryDetailPage: NextPage<{ country: CountryTypeExtended }> = ({ country }) => {
  const pageTitle = `${country.name.common} - Next Countries Stats`;
  const pageDescription: string = `Detail page of ${country.name.common}`;

  const [borderingCountries, setBorderingCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    const fetchBorders = async () => {
      const fetchedBorders = await getBorderingCountries(country.borders);
      if (!fetchedBorders) return;

      setBorderingCountries(fetchedBorders);
    };

    fetchBorders();
  }, [country.borders]);

  return (
    <ErrorBoundary>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription}></meta>
      </Head>
      <Layout>
        <div className='pb-5'>
          <div className='py-4'>
            <Link href='/' className='py-2 px-6 inline-flex items-center'>
              <Image src='back-button.svg' alt='Back Button' width={24} height={24} />
              <p className='text-sm ml-3'>Homepage</p>
            </Link>
          </div>
          <div className='flex flex-wrap md:flex-nowrap items-start content-start md:gap-5'>
            <CountryHeader
              name={country.name}
              img={country.flags.svg}
              alt={country.flags.alt || country.name.common}
              latlng={country.capitalInfo.latlng}
            />
            <CountryInfo
              capital={country.capital[0]}
              continent={country.region}
              subregion={country.subregion}
              languages={country.languages}
              population={country.population}
              area={country.area}
              currency={country.currencies}
              borders={borderingCountries}
            />
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const url = `/${context.params?.country}`;
  const country = await getSingleCountryFromUrl(url);

  if (!country) {
    return {
      notFound: true,
    };
  }

  return {
    props: { country },
    revalidate: 3600000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allLinks = await getAllCountriesUrl();
  const paths = allLinks.map((link: string) => ({ params: { country: link } }));

  return {
    paths,
    fallback: false,
  };
};

export default CountryDetailPage;
