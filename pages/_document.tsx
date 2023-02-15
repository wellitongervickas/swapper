import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='h-full w-screen bg-black text-gray-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
