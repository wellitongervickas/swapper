import useSwapNativeToToken from '@/modules/core/pool/hooks/usePoolNativeToToken'
import { useEffect, useState } from 'react'

const SwapDetails = () => {
  const { getQuoteOut } = useSwapNativeToToken()

  const [quote, setQuote] = useState('0')

  useEffect(() => {
    getQuoteOut(0.5).then((quote: string) => {
      if (!quote) return
      setQuote(quote)
    })
  }, [getQuoteOut])

  return <div>Quote value: {quote}</div>
}

export default SwapDetails
