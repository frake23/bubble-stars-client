import '../globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetcher from '../fetcher'
import UserContextProvider from '../context/UserContextProvider'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher}}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
      
    </SWRConfig>
  )
}

export default MyApp
