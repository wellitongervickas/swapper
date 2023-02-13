import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useNativeToken() {
  const { state } = useWallet()
  const config = useChainConfig()

  return {
    ...config.tokens.WETH,
    balance: state.balance
  }
}

export default useNativeToken
