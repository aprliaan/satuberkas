import '@styles/globals.scss'
import '@styles/globals.css'
import type { AppProps } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import { ProgressBar } from '@components/ProgressBar'
import { SessionProvider } from "next-auth/react";

// config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ProgressBar />
      <Component {...pageProps} />
    </SSRProvider>

  )
}

export default MyApp
