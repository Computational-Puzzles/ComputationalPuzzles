import { Provider } from 'next-auth/client'

import '../styles/globals.scss'

function MyApp({
  Component,
  pageProps: { session, initStore, ...pageProps },
}) {
  return (
    <Provider >
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
