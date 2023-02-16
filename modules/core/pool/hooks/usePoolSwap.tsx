import { useCallback, useMemo, useState } from 'react'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import { PoolConstants } from '../types/factory'
import usePoolContract from './usePoolContract'
import { FeeAmount } from '@uniswap/v3-sdk'
import { Token } from '@/modules/core/tokens/types/token'
import useQuoterContract from './useQuoterContract'
import { QuoteExactInputSingleParams } from '../types/quoter'
import { parseUnits } from 'ethers/lib/utils'
import useERC20Contract from '@/modules/core/contracts/hooks/useERC20Contract'
import { BigNumber } from 'bignumber.js'
import useRouterContract from './useRouterContract'
import { RouterExactInputSingleParams } from '../types/router'
import useWNativeContract from '../../contracts/hooks/useWNativeContract'
import useRemainingTime from '@/modules/shared/hooks/useRemainingTime'
import { Duration } from 'luxon'

interface UsePoolSwapProps {
  factoryAddress: string
  quoterAddress: string
  routerAddress: string
  tokenA: Token
  tokenB: Token
  fee: keyof typeof FeeAmount
  nativeAddress?: string
  executeAsNative?: boolean
}

function usePoolSwap({
  tokenA,
  tokenB,
  fee,
  factoryAddress,
  quoterAddress,
  routerAddress,
  executeAsNative
}: UsePoolSwapProps) {
  const { state, wallet } = useWallet()
  const [deadlineTime, setDeadlineTime] = useState(0)

  const { label: remainingTime } = useRemainingTime(
    Duration.fromMillis(deadlineTime)
      .shiftTo('days', 'hours', 'minutes', 'seconds')
      .toObject()
  )

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

  const { call: tokenACall, loading: tokenALoading } = useERC20Contract({
    address: tokenA.address
  })

  const { call: wNativeCall, loading: nativeLoading } = useWNativeContract({
    address: tokenA.native && executeAsNative ? tokenA.address : undefined
  })

  const {
    call: poolCall,
    contract,
    loading: poolLoading
  } = usePoolContract({
    address: poolFactory?.address
  })

  const { call: quoterCall, loading: quoterLoading } = useQuoterContract({
    address: quoterAddress
  })

  const { call: routerCall, loading: routerLoading } = useRouterContract({
    address: routerAddress
  })

  const isLoading = useMemo(
    () =>
      tokenALoading ||
      poolLoading ||
      quoterLoading ||
      routerLoading ||
      nativeLoading,
    [tokenALoading, poolLoading, quoterLoading, routerLoading, nativeLoading]
  )

  const getConstants = useCallback(async (): Promise<
    PoolConstants | undefined
  > => {
    if (!contract) {
      return
    }
    const fee = await poolCall('fee')

    return {
      fee
    }
  }, [poolCall, contract])

  const getQuoteOut = useCallback(
    async (amount: string): Promise<string> => {
      const constants = await getConstants()
      if (!constants) return '0'

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
    [getConstants, poolFactory, quoterCall]
  )

  const executeTrade = async (amount: string) => {
    const provider = wallet.provider?.instance
    if (!provider) return

    const amountIn = parseUnits(amount, poolFactory.tokenA.decimals).toString()

    if (executeAsNative) {
      // deposit native in exchange to wrapped native
      await executeAsNativeDeposit(amountIn)
    }

    const isAllowanceApproved = await checkAllowanceApproval(amountIn)
    if (!isAllowanceApproved) return

    const constants = await getConstants()
    if (!constants) return

    const params: RouterExactInputSingleParams = {
      tokenIn: poolFactory.tokenA.address,
      tokenOut: poolFactory.tokenB.address,
      fee: constants.fee,
      recipient: state.address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
      amountIn: amountIn
    }

    setDeadlineTime(params.deadline * 1000)
    const receipt = await routerCall('exactInputSingle', params)
    setDeadlineTime(0)

    return receipt
  }

  const executeAsNativeDeposit = async (amount: string) => {
    return await wNativeCall('deposit', amount)
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
    loading: isLoading,
    isQuoting: quoterLoading,
    isExecuting: routerLoading,
    poolFactory,
    getConstants,
    getQuoteOut,
    executeTrade,
    remainingTime
  }
}

export default usePoolSwap
