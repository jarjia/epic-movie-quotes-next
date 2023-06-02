import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import React from 'react';
import { AppContextProvider } from '@/context';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const MyComponent = Component as any;

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <MyComponent {...pageProps} />
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default App;
