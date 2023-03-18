// TODO -> reduce loading time

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllCountriesUrl, getSingleCountryFromUrl } from '@/libs/countries-utils';
import { CountryType } from '@/types';
import CountryHeader from '@/components/country/CountryHeader';
import CountryInfo from '@/components/country/CountryInfo';
import Layout from '@/components/layout/Layout';

const CountryDetailPage: NextPage<{ country: CountryType }> = ({ country }) => {
  // console.log(country);

  return (
    <Layout>
      <div className='pt-12'>
        <div className='flex flex-nowrap items-start content-start gap-5'>
          <CountryHeader
            name={country.name}
            img={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            latlng={country.capitalInfo.latlng}
          />
          <CountryInfo
            capital={country.capital[0]}
            region={country.region}
            languages={country.languages}
            population={country.population}
            area={country.area}
            currency={country.currencies}
          />
        </div>
      </div>
    </Layout>
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
