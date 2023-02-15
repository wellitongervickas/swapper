import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, useState } from 'react'
import { formatUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'
import { FeeAmount } from '@uniswap/v3-sdk'

interface SwapWidgetProps {
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
}

const SwapWidget = ({ tokenA, tokenB, fee }: SwapWidgetProps) => {
  const config = useChainConfig()

  const { getQuoteOut, poolFactory, executeTrade } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    quoterAddress: config.hubs.uniswapQuoter.address,
    routerAddress: config.hubs.uniswapRouter.address,
    fee,
    tokenA,
    tokenB
  })

  const [quote, setQuote] = useState('0')
  const [amount, setAmount] = useState('0')

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
    if (!amount) return
    await executeTrade(amount)
  }

  return (
    <div>
      <div className='flex flex-col'>
        {tokenA.symbol} amount
        <input
          id={tokenA.address}
          type='number'
          onChange={handleChangeTokenIn}
          defaultValue='0.0'
        />
      </div>
      <div className='flex flex-col'>
        {tokenB.symbol} amount
        <input
          id={tokenB.address}
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

export default SwapWidget
