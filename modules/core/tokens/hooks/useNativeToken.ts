import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { useState, useEffect } from 'react'

function useNativeToken() {
  const { state, wallet } = useWallet()
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (state.connected) {
      wallet.provider?.signer?.getBalance().then(setBalance)
    }
  }, [state.connected, wallet.provider?.signer])

  return {
    balance
  }
}

export default useNativeToken
