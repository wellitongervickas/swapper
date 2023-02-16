import { useEffect } from 'react'

import useContractCaller from '@/modules/core/contracts/hooks/useContractCaller'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import WNativeContract from '../WNativeContract'

interface UseWNativeContractProps {
  address?: string
}

export function useWNativeContract({ address }: UseWNativeContractProps) {
  const { state: walletState, signerOrProvider } = useWallet()
  const { call, loading, setContract } = useContractCaller<WNativeContract>()

  useEffect(() => {
    if (!signerOrProvider || !address) return

    const contract = new WNativeContract(address, signerOrProvider)
    setContract(contract)
  }, [signerOrProvider, setContract, walletState.chainId, address])

  return {
    loading,
    call
  }
}

export default useWNativeContract
