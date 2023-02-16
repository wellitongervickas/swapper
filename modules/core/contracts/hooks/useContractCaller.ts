import { useCallback, useState } from 'react'

export default function useContractCaller<CONTRACT = any>() {
  const [contract, setContract] = useState<CONTRACT>()
  const [loading, setLoading] = useState(false)

  const call = useCallback(
    async <ARGUMENTS = any, RETURN = any>(
      method: keyof CONTRACT,
      ...args: ARGUMENTS[]
    ): Promise<RETURN | undefined> => {
      if (!contract) return
      if (typeof contract[method] !== 'function') return

      setLoading(true)

      try {
        return (contract[method] as Function)(...args)
      } finally {
        setLoading(false)
      }
    },
    [contract]
  )

  return { call, loading, setContract, contract }
}
