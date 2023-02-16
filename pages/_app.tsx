import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import LayoutDefault from '@/components/shared/layouts/Default'
import config from '@/config'
import head from '@/modules/utils/head'

import { Work_Sans } from '@next/font/google'
import localFont from '@next/font/local'

const fontSetup = Work_Sans({
  weight: ['400', '500', '600'],
  style: 'normal',
  subsets: ['latin']
})

const mainFontSetup = localFont({ src: '../public/assets/fonts/Pixel.ttf' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --fontFamily: ${fontSetup.style.fontFamily};
            --mainFontFamily: ${mainFontSetup.style.fontFamily};
          }
          body {
            font-family: var(--fontFamily);
            font-style: ${fontSetup.style.fontStyle};
            font-weight: ${fontSetup.style.fontWeight || '400'};
          }
        `}
      </style>
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
