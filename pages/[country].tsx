import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllCountriesUrl, getSingleCountryFromUrl } from '@/libs/countries-utils';
import { CountryTypeExtended } from '@/types';
import CountryHeader from '@/components/country/CountryHeader';
import CountryInfo from '@/components/country/CountryInfo';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

const CountryDetailPage: NextPage<{ country: CountryTypeExtended }> = ({ country }) => {
  return (
    <Layout>
      <div className='py-4'>
        <Link href='/' className='py-2 px-6 inline-flex items-center'>
          <Image src='back-button.svg' alt='Back Button' width={24} height={24} />
          <p className='text-sm ml-3'>Homepage</p>
        </Link>
      </div>
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
