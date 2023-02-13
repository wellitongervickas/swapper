import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, useState } from 'react'

const SwapDetails = () => {
  const config = useChainConfig()

  const { getQuoteOut } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    tokenA: config.tokens.WETH,
    tokenB: config.tokens.SWPR,
    fee: 'LOW'
  })

  const [quote, setQuote] = useState('0')

  const handleGetQuote = async (amount: string) => {
    if (!+amount) return
    const quoted = await getQuoteOut(amount)
    setQuote(quoted)
  }

  const handleChangeTokenIn = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetQuote(event.target.value)
  }

  return (
    <div>
      <div className='flex flex-col'>
        ETH amount
        <input
          type='number'
          onChange={handleChangeTokenIn}
          defaultValue='0.0'
        />
      </div>
      <div className='flex flex-col'>
        SWPR amount
        <input type='text' disabled value={quote} />
      </div>
    </div>
  )
}

export default SwapDetails
