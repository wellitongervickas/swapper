import { useEffect } from 'react'
import useContractCaller from '@/modules/core/contracts/hooks/useContractCaller'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import RouterContract from '../RouterContract'

interface UseRouterContractProps {
  address?: string
}

export default function useRouterContract({ address }: UseRouterContractProps) {
  const { signerOrProvider } = useWallet()
  const { call, loading, setContract, contract } =
    useContractCaller<RouterContract>()

  useEffect(() => {
    if (!signerOrProvider || !address) return
    setContract(new RouterContract(address, signerOrProvider))
  }, [setContract, address, signerOrProvider])

  return {
    call,
    loading,
    contract
  }
}
