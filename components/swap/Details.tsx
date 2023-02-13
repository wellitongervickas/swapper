import useSwapNativeToToken from '@/modules/core/pool/hooks/usePoolNativeToToken'
import { ChangeEvent, useState } from 'react'

const SwapDetails = () => {
  const { getQuoteOut } = useSwapNativeToToken()

  const [quote, setQuote] = useState('0')

  const handleGetQuote = async (amount: string) => {
    if (!amount) return
    const quoted = await getQuoteOut(+amount)
    setQuote(quoted)
  }

  const handleChangeTokenIn = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetQuote(event.target.value)
  }

  return (
    <div>
      <div>Quote value: {quote}</div>
      <div className='flex flex-col'>
        ETH amount
        <input type='text' onChange={handleChangeTokenIn} />
      </div>
      <div className='flex flex-col'>
        SWPR amount
        <input type='text' disabled value={quote || '0'} />
      </div>
    </div>
  )
}

export default SwapDetails
