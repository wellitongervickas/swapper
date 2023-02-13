import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { useCallback, useMemo } from 'react'
import useWallet from '../../wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import { PoolConstants, PoolInfo } from '../types/factory'
import usePoolContract from './usePoolContract'
import { Pool } from '@uniswap/v3-sdk'
import { fromReadableAmount } from '../utils/pool'

function useSwapNativeToToken() {
  const config = useChainConfig()
  const { state } = useWallet()

  const poolFactory = useMemo(
    () =>
      new PoolFactory({
        chainId: state.chainId,
        factoryAddress: config.hubs.uniswapFactory.address,
        tokenA: config.tokens.WETH,
        tokenB: config.tokens.SWPR
      }),
    [
      config.hubs.uniswapFactory.address,
      config.tokens.WETH,
      config.tokens.SWPR,
      state.chainId
    ]
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
    async (amount: number) => {
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

      const outputAmount = fromReadableAmount(
        amount * parseFloat(pool.token1Price.toFixed(2)),
        poolFactory.tokenB.decimals
      ).toString()

      return outputAmount
    },
    [getState, poolFactory]
  )

  return { poolFactory, getConstants, getState, getQuoteOut }
}

export default useSwapNativeToToken
