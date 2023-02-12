import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'

import config from '@/config'
import head from '@/modules/utils/head'

import LayoutDefault from '@/components/shared/layouts/Default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{head.renderTitle(config.name, pageProps)}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content={pageProps.description ?? config.meta.description}
        />
      </Head>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </>
  )
}
