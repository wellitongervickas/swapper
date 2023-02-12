import { useHookstate } from '@hookstate/core'
import wallet from '@/modules/core/wallet'
import state, { DEFAULT_STATE, State } from '@/modules/core/wallet/store/state'
import proxies from '@/modules/utils/proxy'
import { Persistence } from '@hookstate/persistence'
import { useEffect, useState } from 'react'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'

const persistence = Persistence('swapper.wallet')

export function useWallet() {
  const _state = useHookstate<State>(state)
  const [isStorageAttached, setIsStorageAttached] = useState(false)

  const signerOrProvider: Web3Provider | JsonRpcSigner | undefined =
    wallet.provider?.signer?.instance || wallet.provider?.instance

  useEffect(() => {
    if (isStorageAttached) return
    _state.merge(persistence)
    setIsStorageAttached(true)
  }, [_state, isStorageAttached])

  return {
    signerOrProvider,
    wallet,
    state: proxies.readOnly<typeof DEFAULT_STATE, typeof _state>(_state)
  }
}

export default useWallet
