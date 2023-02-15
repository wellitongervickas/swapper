import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'
import { FeeAmount } from '@uniswap/v3-sdk'
import CardDefault from '../shared/card/Default'

interface SwapWidgetProps extends ComponentProps<'div'> {
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
  onSwitch(): void
}

const SwapWidget = ({
  tokenA,
  tokenB,
  fee,
  className,
  onSwitch
}: SwapWidgetProps) => {
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

  const handleChangeTokenA = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value
    const [, decimalsValues] = fieldValue.split('.')
    if (decimalsValues && decimalsValues.length > tokenA.decimals) return

    setAmount(fieldValue)
    handleGetQuote(fieldValue)
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
    <CardDefault className={className}>
      <button onClick={onSwitch}>Switch</button>
      <div className='flex flex-col'>
        {tokenA.symbol} amount
        <input
          key={tokenA.address}
          id={tokenA.address}
          type='number'
          onChange={handleChangeTokenA}
          value={amount}
        />
      </div>
      <div className='flex flex-col'>
        {tokenB.symbol} amount
        <input
          key={tokenB.address}
          id={tokenB.address}
          type='number'
          disabled
          value={formatUnits(quote, poolFactory.tokenB.decimals)}
        />
      </div>
      <div>
        <button onClick={handleExecuteSwap}>Execute</button>
      </div>
    </CardDefault>
  )
}

export default SwapWidget
