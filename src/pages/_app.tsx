import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import { Toaster } from 'react-hot-toast';

const MyApp = ({
  Component,
  pageProps: { session, initStore, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
