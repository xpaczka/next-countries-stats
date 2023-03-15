import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllCountries, getAllCountriesUrl } from "@/libs/countries-utils";
import { CountryType } from "@/types";

const CountryDetailPage: NextPage<{country: CountryType}> = ({country}) => {
    return <p>{country.name.common}</p>;
}

export const getStaticProps: GetStaticProps = async context => {
    const url = context.params?.country;
    const links = await getAllCountriesUrl();
    const allCountries = await getAllCountries();

    const countryIndex = links.findIndex(link => link === url);
    const country = allCountries[countryIndex];

    return {
        props: {country},
        revalidate: 3600000,
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allLinks = await getAllCountriesUrl();
    const paths = allLinks.map((link: string) => ({params: {country: link}}));

    return {
        paths,
        fallback: false
    };
}

export default CountryDetailPage;