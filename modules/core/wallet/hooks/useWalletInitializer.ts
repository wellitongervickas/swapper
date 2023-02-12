import { useEffect, useState } from 'react'

import useWallet from '@/modules/core/wallet/hooks/useWallet'

function useWalletInitializer() {
  const [isDappInitialized, setIsDappInitialized] = useState(false)
  const { state, wallet } = useWallet()

  useEffect(() => {
    if (isDappInitialized) return
    setIsDappInitialized(true)
    if (!state.connected) return

    import('@/modules/core/wallet/providers').then(({ default: providers }) => {
      const ProviderConstructor =
        providers[state.providerName as keyof typeof providers]

      if (!ProviderConstructor) return

      const provider = new ProviderConstructor()
      wallet.use(provider).then(wallet.connect.bind(wallet))
    })
  }, [isDappInitialized, state.connected, state.providerName, wallet])
}

export default useWalletInitializer
