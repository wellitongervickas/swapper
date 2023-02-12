import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { useEffect, useState } from 'react'
import useWallet from '../../wallet/hooks/useWallet'
import { PoolFactory } from '../factory'

function useTokenToNative() {
  const config = useChainConfig()

  const { state } = useWallet()
  const [pool, setPool] = useState<PoolFactory>()

  useEffect(() => {
    if (!state.connected) return
    const poolInstance = new PoolFactory({
      chainId: state.chainId,
      factoryAddress: config.hubs.uniswap.address,
      tokenA: config.tokens.ETH,
      tokenB: config.tokens.SWPR
    })

    setPool(poolInstance)
  }, [
    config.hubs.uniswap.address,
    state.connected,
    config.tokens.ETH,
    config.tokens.SWPR,
    state.chainId
  ])

  return { pool }
}

export default useTokenToNative
