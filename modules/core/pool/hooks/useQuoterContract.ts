import { useEffect } from 'react'
import useContractCaller from '@/modules/core/contracts/hooks/useContractCaller'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import QuoterContract from '../QuoterContract'

interface UseQuoterContractProps {
  address?: string
}

export default function useQuoterContract({ address }: UseQuoterContractProps) {
  const { signerOrProvider } = useWallet()
  const { call, loading, setContract, contract } =
    useContractCaller<QuoterContract>()

  useEffect(() => {
    if (!signerOrProvider || !address) return
    setContract(new QuoterContract(address, signerOrProvider))
  }, [setContract, address, signerOrProvider])

  return {
    call,
    loading,
    contract
  }
}
