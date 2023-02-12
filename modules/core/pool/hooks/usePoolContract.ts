import { useEffect } from 'react'
import useContractCaller from '@/modules/core/contracts/hooks/useContractCaller'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import PoolContract from '../PoolContract'

interface UsePoolContractProps {
  address?: string
}

export default function usePoolContract({ address }: UsePoolContractProps) {
  const { signerOrProvider } = useWallet()
  const { call, loading, setContract, contract } =
    useContractCaller<PoolContract>()

  useEffect(() => {
    if (!signerOrProvider || !address) return
    setContract(new PoolContract(address, signerOrProvider))
  }, [setContract, address, signerOrProvider])

  return {
    call,
    loading,
    contract
  }
}
