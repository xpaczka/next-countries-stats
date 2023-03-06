import List from '@/components/list/List';
import { GetServerSideProps, NextPage } from 'next';
import { CountryProps } from '@/types';

const Homepage: NextPage<{ countries: Array<CountryProps> }> = ({ countries }) => {
  return <List countries={countries} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  const sortedCountries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

  return {
    props: { countries: sortedCountries },
  };
};

export default Homepage;
