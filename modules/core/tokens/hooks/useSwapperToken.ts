import { useERC20Contract } from '@/modules/core/contracts/hooks/useERC20Contract'
import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { useState, useEffect } from 'react'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useSwapperToken() {
  const { state } = useWallet()
  const config = useChainConfig()
  const [balance, setBalance] = useState('0')

  const { call } = useERC20Contract({
    address: config.tokens.SWPR.address
  })

  useEffect(() => {
    ;(async () => {
      const balance = await call('balanceOf', state.address)
      if (balance) {
        setBalance(balance)
      }
    })()
  }, [call, state.address])

  return {
    balance,
    decimals: config.tokens.SWPR.decimals
  }
}

export default useSwapperToken
