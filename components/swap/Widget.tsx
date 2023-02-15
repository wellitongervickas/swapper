import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, useEffect, useState } from 'react'
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

  const handleResetFields = () => {
    setQuote('0')
    setAmount('0')
  }

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
    const receipt = await executeTrade(amount)

    if (receipt) {
      handleResetFields()
    }
  }

  useEffect(() => {
    /**
     * Reset fields when pool factory changes
     * to avoind keep the same amount with
     * other decimals on amount and quote field
     */
    if (poolFactory) {
      handleResetFields()
    }
  }, [poolFactory])

  return (
    <div>
      <div className='flex flex-col'>
        {tokenA.symbol} amount
        <input
          key={tokenA.address}
          id={tokenA.address}
          type='number'
          onChange={handleChangeTokenIn}
          defaultValue='0.0'
          value={amount}
        />
      </div>
      <div className='flex flex-col'>
        {tokenB.symbol} amount
        <input
          key={tokenB.address}
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
