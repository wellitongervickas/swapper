import { useWallet } from '@/modules/core/wallet/hooks/useWallet'

function useNativeToken() {
  const { state } = useWallet()

  return {
    balance: state.balance
  }
}

export default useNativeToken
