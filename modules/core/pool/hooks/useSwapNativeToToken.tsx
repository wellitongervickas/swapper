import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { useEffect, useState } from 'react'
import useWallet from '../../wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import usePoolContract from './usePoolContract'

function useSwapNativeToToken() {
  const config = useChainConfig()
  const { state } = useWallet()

  const [poolFactory, setFactory] = useState<PoolFactory>()

  const { call } = usePoolContract({ address: poolFactory?.address })

  const getConstants = async () => {
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
  }

  useEffect(() => {
    if (!state.connected) return
    const factory = new PoolFactory({
      chainId: state.chainId,
      factoryAddress: config.hubs.uniswapFactory.address,
      tokenA: config.tokens.SWPR,
      tokenB: config.tokens.WETH
    })

    setFactory(factory)
  }, [
    config.hubs.uniswapFactory.address,
    state.connected,
    config.tokens.WETH,
    config.tokens.SWPR,
    state.chainId
  ])

  return { poolFactory, getConstants }
}

export default useSwapNativeToToken
