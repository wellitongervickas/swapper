import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, useState } from 'react'
import { formatUnits } from 'ethers/lib/utils'

const SwapDetails = () => {
  const config = useChainConfig()

  const { getQuoteOut, poolFactory, createTrade, executeTrade } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    quoterAddress: config.hubs.uniswapQuoter.address,
    tokenA: config.tokens.WETH,
    tokenB: config.tokens.SWPR,
    fee: 'MEDIUM'
  })

  const [quote, setQuote] = useState('0')
  const [amount, setAmount] = useState('')

  const handleGetQuote = (amount: string) => {
    if (!amount || +amount < 0) return
    getQuoteOut(amount).then(setQuote)
  }

  const handleChangeTokenIn = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setAmount(value)
    handleGetQuote(value)
  }

  const handleExecuteSwap = async () => {
    if (!quote || !amount) return

    const uncheckedTrade = await createTrade(amount, quote)
    if (!uncheckedTrade) return

    executeTrade(uncheckedTrade)
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
