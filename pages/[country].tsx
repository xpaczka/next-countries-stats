// TODO -> reduce loading time

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllCountriesUrl, getSingleCountryFromUrl } from '@/libs/countries-utils';
import { CountryType } from '@/types';
import CountryHeader from '@/components/country/CountryHeader';

const CountryDetailPage: NextPage<{ country: CountryType }> = ({ country }) => {
  return (
    <CountryHeader name={country.name.common} img={country.flags.svg} alt={country.flags.alt || country.name.common} />
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
