import { useCallback, useMemo } from 'react'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import { PoolConstants, PoolInfo } from '../types/factory'
import usePoolContract from './usePoolContract'
import { FeeAmount, Pool } from '@uniswap/v3-sdk'
import BigNumber from 'bignumber.js'
import { parseUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'

interface UsePoolSwapProps {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
}

function usePoolSwap({
  tokenA,
  tokenB,
  factoryAddress,
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

  const { call, contract } = usePoolContract({ address: poolFactory?.address })

  const getConstants = useCallback(async (): Promise<
    PoolConstants | undefined
  > => {
    if (!contract) {
      return
    }
    const [tokenA, tokenB, fee] = await Promise.all([
      call('token0'),
      call('token1'),
      call('fee')
    ])

    return {
      tokenA,
      tokenB,
      fee
    }
  }, [call, contract])

  const getState = useCallback(async (): Promise<PoolInfo | undefined> => {
    if (!contract) {
      return
    }
    const [tickSpacing, liquidity, slot0] = await Promise.all([
      call('tickSpacing'),
      call('liquidity'),
      call('slot0')
    ])

    return {
      tickSpacing,
      liquidity,
      sqrtPriceX96: slot0?.[0],
      tick: slot0?.[1]
    }
  }, [call, contract])

  const getQuoteOut = useCallback(
    async (amount: string) => {
      const state = await getState()
      if (!state) return '0'

      const pool = new Pool(
        poolFactory.tokenA,
        poolFactory.tokenB,
        poolFactory.fee,
        state.sqrtPriceX96.toString(),
        state.liquidity.toString(),
        state.tick
      )

      const total = new BigNumber(amount)
        .multipliedBy(pool.token1Price.toFixed(0))
        .toString()

      return parseUnits(total, poolFactory.tokenB.decimals).toNumber()
    },
    [getState, poolFactory]
  )

  return { poolFactory, getConstants, getState, getQuoteOut }
}

export default usePoolSwap
