import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='h-full overflow-x-hidden bg-black text-gray-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
