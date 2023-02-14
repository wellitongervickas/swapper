import { useERC20Contract } from '@/modules/core/contracts/hooks/useERC20Contract'
import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { useState, useEffect } from 'react'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

function useWETHToken() {
  const { state } = useWallet()
  const config = useChainConfig()
  const [balance, setBalance] = useState('0')

  const { call } = useERC20Contract({
    address: config.tokens.WETH.address
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
    ...config.tokens.WETH,
    balance
  }
}

export default useWETHToken
