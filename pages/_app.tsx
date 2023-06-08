import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '@/context';
import Head from 'next/head';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
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

export default App;
