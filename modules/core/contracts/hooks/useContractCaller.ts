import { useCallback, useState } from 'react'

export default function useContractCaller<CONTRACT = any>() {
  const [contract, setContract] = useState<CONTRACT>()
  const [loading, setLoading] = useState(false)

  const call = useCallback(
    async <ARGUMENTS = any, RETURN = any>(
      method: keyof CONTRACT,
      ...args: ARGUMENTS[]
    ): Promise<RETURN | undefined> => {
      try {
        if (!contract) return
        setLoading(true)

        const result: RETURN =
          typeof contract[method] === 'function'
            ? await (contract[method] as Function)(...args)
            : Promise.resolve(undefined)

        return result
      } catch {
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [contract]
  )

  return { call, loading, setContract, contract }
}
