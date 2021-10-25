import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';

const MyApp = ({
  Component,
  pageProps: { session, initStore, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
