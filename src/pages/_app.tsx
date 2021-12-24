import '../globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetcher from '../fetcher'
import UserContextProvider from '../context/UserContextProvider'
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher}}>
      <UserContextProvider>
        <Head>
          <title>Bubble Stars</title>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
      </UserContextProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(MyApp);
