import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '@/context';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const MyComponent = Component as any;

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Movie Quotes</title>
        <link rel='icon' href='/assets/images/favicon.png' />
      </Head>
      <AppContextProvider>
        <MyComponent {...pageProps} />
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
