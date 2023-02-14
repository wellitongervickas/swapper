import { useCallback, useMemo } from 'react'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import { PoolConstants, PoolInfo } from '../types/factory'
import usePoolContract from './usePoolContract'
import { FeeAmount, Pool, Route, Trade } from '@uniswap/v3-sdk'
import { Token } from '@/modules/core/tokens/types/token'
import useQuoterContract from './useQuoterContract'
import { QuoteExactInputSingleParams } from '../types/quoter'
import { parseUnits } from 'ethers/lib/utils'

import {
  // Currency,
  CurrencyAmount,
  // Percent,
  // Token,
  TradeType
} from '@uniswap/sdk-core'

interface UsePoolSwapProps {
  factoryAddress: string
  quoterAddress: string
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
}

function usePoolSwap({
  tokenA,
  tokenB,
  factoryAddress,
  quoterAddress,
  fee
}: UsePoolSwapProps) {
  const { state } = useWallet()

  const poolFactory = useMemo(
    () =>
      new PoolFactory({
        chainId: state.chainId,
        factoryAddress: factoryAddress,
        tokenA: tokenA,
        tokenB: tokenB,
        fee: FeeAmount[fee]
      }),
    [tokenA, tokenB, factoryAddress, fee, state.chainId]
  )

  const { call: poolCall, contract } = usePoolContract({
    address: poolFactory?.address
  })

  const { call: quoterCall } = useQuoterContract({ address: quoterAddress })

  const getConstants = useCallback(async (): Promise<
    PoolConstants | undefined
  > => {
    if (!contract) {
      return
    }
    const [tokenA, tokenB, fee] = await Promise.all([
      poolCall('token0'),
      poolCall('token1'),
      poolCall('fee')
    ])

    return {
      tokenA,
      tokenB,
      fee
    }
  }, [poolCall, contract])

  const getState = useCallback(async (): Promise<PoolInfo | undefined> => {
    if (!contract) {
      return
    }
    const [tickSpacing, liquidity, slot0] = await Promise.all([
      poolCall('tickSpacing'),
      poolCall('liquidity'),
      poolCall('slot0')
    ])

    return {
      tickSpacing,
      liquidity,
      sqrtPriceX96: slot0?.[0],
      tick: slot0?.[1]
    }
  }, [poolCall, contract])

  const getQuoteOut = useCallback(
    async (amount: string): Promise<string> => {
      const [state, constants] = await Promise.all([getState(), getConstants()])
      if (!state || !constants) return '0'

      const amountIn = parseUnits(amount, poolFactory.tokenA.decimals)
      if (amountIn.lte(0)) return '0'

      const quoteOut = await quoterCall<QuoteExactInputSingleParams, string>(
        'quoteExactInputSingle',
        {
          token0: constants.tokenA,
          token1: constants.tokenB,
          fee: constants.fee,
          amount: amountIn
        }
      )

      return quoteOut ?? '0'
    },
    [getState, getConstants, poolFactory, quoterCall]
  )

  const createTrade = useCallback(
    async (amount: string) => {
      const state = await getState()
      if (!state) return

      const pool = new Pool(
        poolFactory.tokenA,
        poolFactory.tokenB,
        poolFactory.fee,
        state.sqrtPriceX96.toString(),
        state.liquidity.toString(),
        state.tick
      )

      const route = new Route([pool], poolFactory.tokenA, poolFactory.tokenB)
      const amountIn = parseUnits(amount, poolFactory.tokenA.decimals)
      const amountOut = await getQuoteOut(amount)

      const uncheckedTrade = Trade.createUncheckedTrade({
        route,
        inputAmount: CurrencyAmount.fromRawAmount(
          poolFactory.tokenA,
          amountIn.toString()
        ),
        outputAmount: CurrencyAmount.fromRawAmount(
          poolFactory.tokenB,
          amountOut.toString()
        ),
        tradeType: TradeType.EXACT_INPUT
      })

      return uncheckedTrade
    },
    [poolFactory, getState, getQuoteOut]
  )

  return { poolFactory, getConstants, getState, getQuoteOut, createTrade }
}

export default usePoolSwap
