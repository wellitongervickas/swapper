import { useCallback, useMemo } from 'react'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import { PoolConstants, PoolInfo } from '../types/factory'
import usePoolContract from './usePoolContract'
import { FeeAmount } from '@uniswap/v3-sdk'
import { Token } from '@/modules/core/tokens/types/token'
import useQuoterContract from './useQuoterContract'
import { QuoteExactInputSingleParams } from '../types/quoter'
import { parseUnits } from 'ethers/lib/utils'
import useERC20Contract from '@/modules/core/contracts/hooks/useERC20Contract'
import { BigNumber } from 'bignumber.js'
import useRouterContract from './useRouterContract'

interface UsePoolSwapProps {
  factoryAddress: string
  quoterAddress: string
  routerAddress: string
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
}

function usePoolSwap({
  tokenA,
  tokenB,
  fee,
  factoryAddress,
  quoterAddress,
  routerAddress
}: UsePoolSwapProps) {
  const { state, wallet } = useWallet()

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

  const { call: tokenACall } = useERC20Contract({ address: tokenA.address })

  const { call: poolCall, contract } = usePoolContract({
    address: poolFactory?.address
  })

  const { call: quoterCall } = useQuoterContract({ address: quoterAddress })

  const { call: routerCall } = useRouterContract({ address: routerAddress })

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
          tokenIn: poolFactory.tokenA.address,
          tokenOut: poolFactory.tokenB.address,
          fee: constants.fee,
          amount: amountIn.toString()
        }
      )

      return quoteOut || '0'
    },
    [getState, getConstants, poolFactory, quoterCall]
  )

  const executeTrade = async (amount: string) => {
    const provider = wallet.provider?.instance
    if (!provider) return

    const amountIn = parseUnits(amount, poolFactory.tokenA.decimals).toString()

    const isAllowanceApproved = await checkAllowanceApproval(amountIn)
    if (!isAllowanceApproved) return

    const constants = await getConstants()
    if (!constants) return

    const params = {
      tokenIn: constants.tokenA,
      tokenOut: constants.tokenB,
      fee: constants.fee,
      recipient: state.address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
      amountIn: amountIn,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    }

    const receipt = await routerCall('exactInputSingle', params)
    return receipt
  }

  const checkAllowanceApproval = async (amount: string) => {
    const allowance = await tokenACall(
      'allowance',
      state.address,
      routerAddress
    )

    const allowanceBN = new BigNumber(allowance)
    if (allowanceBN.gte(amount)) return true

    const approved = await tokenACall('approve', routerAddress, amount)
    return approved
  }

  return {
    poolFactory,
    getConstants,
    getState,
    getQuoteOut,
    executeTrade
  }
}

export default usePoolSwap
