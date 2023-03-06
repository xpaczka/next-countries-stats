import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import CountriesProvider from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountriesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountriesProvider>
  );
}
