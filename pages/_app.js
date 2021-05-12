import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import 'next-pagination/dist/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
