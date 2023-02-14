import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, useState } from 'react'
import { formatUnits } from 'ethers/lib/utils'

const SwapDetails = () => {
  const config = useChainConfig()

  const { getQuoteOut, poolFactory, createTrade } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    quoterAddress: config.hubs.uniswapQuoter.address,
    tokenA: config.tokens.WETH,
    tokenB: config.tokens.SWPR,
    fee: 'MEDIUM'
  })

  const [quote, setQuote] = useState('0')

  const handleGetQuote = async (amount: string) => {
    if (!amount || +amount < 0) return
    const quoted = await getQuoteOut(amount)
    setQuote(quoted)
  }

  const handleChangeTokenIn = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetQuote(event.target.value)
  }

  const handleExecuteSwap = async () => {
    if (!quote) return
    const trade = await createTrade(quote)
    console.log(trade)
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
        <input
          type='text'
          disabled
          value={formatUnits(quote, poolFactory.tokenB.decimals)}
        />
      </div>
      <div>
        <button onClick={handleExecuteSwap}>Execute</button>
      </div>
    </div>
  )
}

export default SwapDetails
