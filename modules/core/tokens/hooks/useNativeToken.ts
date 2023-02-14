import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useNativeToken() {
  const { state } = useWallet()
  const config = useChainConfig()

  return {
    ...config.tokens.NATIVE,
    balance: state.balance
  }
}

export default useNativeToken
