import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'
import { formatUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'
import { FeeAmount } from '@uniswap/v3-sdk'
import CardDefault from '@/components/shared/card/Default'
import Button from '@/components/shared/form/Button'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import SwapSwitch from './Switcher'
import classnames from '@/modules/utils/classnames'

interface SwapWidgetProps extends ComponentProps<'div'> {
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
}

const SwapWidget = ({
  tokenA,
  tokenB,
  fee,
  className,
  ...props
}: SwapWidgetProps) => {
  const config = useChainConfig()
  const { state } = useWallet()

  const [tokens, setTokens] = useState<Token[]>([tokenA, tokenB])

  const { getQuoteOut, poolFactory, executeTrade } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    quoterAddress: config.hubs.uniswapQuoter.address,
    routerAddress: config.hubs.uniswapRouter.address,
    fee,
    tokenA: tokens[0],
    tokenB: tokens[1]
  })

  const [quote, setQuote] = useState('0')
  const [amount, setAmount] = useState('0')

  const handleResetFields = () => {
    setQuote('0')
    setAmount('0')
  }

  const handleSwitchTokens = () => {
    setTokens((state) => [state[1], state[0]])
  }

  const handleGetQuote = (amount: string) => {
    if (!amount || +amount < 0) return
    getQuoteOut(amount).then(setQuote)
  }

  const handleChangeTokenA = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value
    const [, decimalsValues] = fieldValue.split('.')
    if (decimalsValues && decimalsValues.length > tokens[0].decimals) return

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
     * to avoind keep the same value with
     * other decimals on amount and quote field
     */
    if (poolFactory) {
      handleResetFields()
    }
  }, [poolFactory])

  return (
    <CardDefault
      {...props}
      className={classnames.merge([className, 'ring-2 ring-gray-900/50'])}
    >
      <div className='flex'>
        <SwapSwitch
          activeToken={tokens[0]}
          tokenA={tokenA}
          tokenB={tokenB}
          onSwitch={handleSwitchTokens}
        />
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          {tokens[0].symbol} amount
          <input
            key={tokens[0].address}
            id={tokens[0].address}
            type='number'
            onChange={handleChangeTokenA}
            value={amount}
            disabled={!state.connected}
          />
          {tokens[0].native && (
            <div>
              <input id='useNative' type='checkbox' />
              <label htmlFor='useNative'>Use native balance</label>
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          {tokens[1].symbol} amount
          <input
            key={tokens[1].address}
            id={tokens[1].address}
            type='number'
            disabled
            value={formatUnits(quote, tokens[1].decimals)}
          />
        </div>
        <div>
          <Button onClick={handleExecuteSwap} disabled={!state.connected}>
            Execute
          </Button>
        </div>
      </div>
    </CardDefault>
  )
}

export default SwapWidget
