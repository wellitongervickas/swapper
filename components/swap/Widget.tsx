import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import usePoolSwap from '@/modules/core/pool/hooks/usePoolSwap'
import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { Token } from '@/modules/core/tokens/types/token'
import { FeeAmount } from '@uniswap/v3-sdk'
import CardDefault from '@/components/shared/card/Default'
import Button from '@/components/shared/form/Button'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import SwapSwitch from './Switcher'
import classnames from '@/modules/utils/classnames'
import SwapTokenOut from './TokenOut'
import SwapTokenIn from './TokenIn'
import Divider from '../shared/Divider'
import SwapCardNativeExecutionAlert from './Cards/NativeExecutionAlert'
import { BigNumber } from 'bignumber.js'
import SwapCardReceipt from './Cards/Receipt'
import SwapCardStatus from './Cards/Status'

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
  const [hashAddress, setHashAddress] = useState('')
  const [executeAsNative, setExecuteAsNative] = useState(false)

  const {
    getQuoteOut,
    poolFactory,
    executeTrade,
    loading,
    isQuoting,
    remainingTime,
    isExecuting,
    status
  } = usePoolSwap({
    factoryAddress: config.hubs.uniswapFactory.address,
    quoterAddress: config.hubs.uniswapQuoter.address,
    routerAddress: config.hubs.uniswapRouter.address,
    tokenA: tokens[0],
    tokenB: tokens[1],
    executeAsNative,
    fee
  })

  const [quote, setQuote] = useState('0')
  const [amount, setAmount] = useState('0')

  const isAmountZero = useMemo(
    () => new BigNumber(amount, tokens[0].decimals).eq(0),
    [amount, tokens]
  )

  const handleExecuteAsNative = (value: boolean) => {
    setExecuteAsNative(value)
  }

  const handleResetFields = () => {
    setQuote('0')
    setAmount('0')
    setExecuteAsNative(false)
    setHashAddress('')
  }

  const handleSwitchTokens = () => {
    setTokens((state) => [state[1], state[0]])
  }

  const handleGetQuote = (amount: string) => {
    if (!amount || +amount < 0) return
    getQuoteOut(amount).then(setQuote)
  }

  const handleChangeTokenA = (value: string) => {
    const [, decimalsValues] = value.split('.')
    if (decimalsValues && decimalsValues.length > tokens[0].decimals) return

    setAmount(value)
    handleGetQuote(value)
  }

  const handleExecuteSwap = async () => {
    if (!amount) return
    const receipt = await executeTrade(amount)

    if (receipt) {
      handleResetFields()
      setHashAddress(receipt.transactionHash)
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
    <div className={classnames.merge([className, 'flex flex-col space-y-4'])}>
      {typeof status !== 'undefined' && <SwapCardStatus status={status} />}
      <CardDefault
        {...props}
        className={classnames.merge([
          'flex flex-col space-y-4 ring-2 ring-gray-900/50'
        ])}
      >
        <div className='flex'>
          <SwapSwitch
            disabled={loading || !state.connected}
            activeToken={tokens[0]}
            tokenA={tokenA}
            tokenB={tokenB}
            onSwitch={handleSwitchTokens}
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <SwapTokenIn
            token={tokens[0]}
            disabled={isExecuting || !state.connected}
            amount={amount}
            onChangeAmount={handleChangeTokenA}
            onChangeUseNative={handleExecuteAsNative}
            executeAsNativeValue={executeAsNative}
          />
          <Divider />
          <SwapTokenOut token={tokens[1]} loading={isQuoting} amount={quote} />
          <div className='flex flex-col space-y-4'>
            {!isExecuting && executeAsNative && (
              <SwapCardNativeExecutionAlert token={tokens[0]} />
            )}
            <div className='flex items-center justify-between'>
              <Button
                loading={loading}
                onClick={handleExecuteSwap}
                disabled={loading || !state.connected || isAmountZero}
              >
                {isExecuting ? 'Executing' : 'Execute'}
              </Button>
              {isExecuting && <span>???? {remainingTime}</span>}
            </div>
          </div>
        </div>
        {hashAddress && <SwapCardReceipt hashAddress={hashAddress} />}
      </CardDefault>
    </div>
  )
}

export default SwapWidget
