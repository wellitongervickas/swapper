import { useERC20Contract } from '@/modules/core/contracts/hooks/useERC20Contract'
import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { useState, useEffect } from 'react'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useSwapperToken() {
  const { state } = useWallet()
  const config = useChainConfig()

  const [balance, setBalance] = useState('0')

  const { getBalance } = useERC20Contract({
    address: config?.tokens.SWPR?.address
  })

  useEffect(() => {
    if (state.connected) {
      getBalance(state.address).then(setBalance)
    }
  }, [getBalance, state.address, state.connected])

  return {
    balance
  }
}

export default useSwapperToken
