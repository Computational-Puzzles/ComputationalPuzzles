import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const MyApp = ({
  Component,
  pageProps: { session, initStore, ...pageProps }
}: AppProps) => {
  const TOAST_LIMIT = 1;
  const { toasts } = useToasterStore();

  // This limits the number of the toast displayed at the same time
  // Solution is proposed by @timolins from https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  useEffect(() => {
    toasts
      .filter(t => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach(t => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <SessionProvider session={session}>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
