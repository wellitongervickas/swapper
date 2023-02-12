import { useEffect } from 'react'

import useContractCaller from '@/modules/core/contracts/hooks/useContractCaller'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import ERC20Contract from '../ERC20Contract'

interface UseERC20ContractProps {
  address?: string
}

export function useERC20Contract({ address }: UseERC20ContractProps) {
  const { state: walletState, signerOrProvider } = useWallet()
  const { call, loading, setContract } = useContractCaller<ERC20Contract>()

  useEffect(() => {
    if (!signerOrProvider || !address) return

    const contract = new ERC20Contract(address, signerOrProvider)
    setContract(contract)
  }, [signerOrProvider, setContract, walletState.chainId, address])

  return {
    loading,
    call
  }
}

export default useERC20Contract
