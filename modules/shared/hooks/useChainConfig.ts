import config from '@/config'
import { getConfigByChainId } from '@/config/utils/chains'
import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { useMemo } from 'react'

const FALLBACK_CHAIN = config.chains.goerli

function useChainConfig() {
  const { state } = useWallet()

  const chainConfig = useMemo(
    () => getConfigByChainId(state.chainId),
    [state.chainId]
  )

  return chainConfig || FALLBACK_CHAIN
}

export default useChainConfig
