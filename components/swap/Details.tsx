import useSwapNativeToToken from '@/modules/core/pool/hooks/usePoolNativeToToken'
import { commify, formatUnits } from 'ethers/lib/utils'
import { ChangeEvent, useState } from 'react'

const SwapDetails = () => {
  const { getQuoteOut, poolFactory } = useSwapNativeToToken()

  const [quote, setQuote] = useState('0')

  const handleGetQuote = async (amount: string) => {
    if (!+amount) return
    console.log(amount)
    const quoted = await getQuoteOut(amount)
    setQuote(`${quoted}`)
  }

  const handleChangeTokenIn = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetQuote(event.target.value)
  }

  return (
    <div>
      <div>Quote value: {quote}</div>
      <div className='flex flex-col'>
        ETH amount
        <input type='number' onChange={handleChangeTokenIn} />
      </div>
      <div className='flex flex-col'>
        SWPR amount
        <input
          type='number'
          disabled
          value={commify(formatUnits(quote, poolFactory.tokenB.decimals))}
        />
      </div>
    </div>
  )
}

export default SwapDetails
