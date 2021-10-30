import { CookiesProvider } from "react-cookie"
import Navbar from "../components/navbar"
import { parseCookies } from "../helper/";
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps,router }) {
  if (router.pathname.startsWith('/dashboard')) {
    return (
      
      <CookiesProvider>
<Navbar>
      <Component {...pageProps} />
      </Navbar>
      </CookiesProvider>
     
    )
  }

  return (
    <CookiesProvider>
    <Component {...pageProps} />
    
    </CookiesProvider>
  )
  
}

export default MyApp
