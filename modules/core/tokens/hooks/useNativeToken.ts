import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useNativeToken() {
  const { state } = useWallet()
  const config = useChainConfig()

  return {
    balance: state.balance,
    decimals: config.tokens.WETH.decimals
  }
}

export default useNativeToken
