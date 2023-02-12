import { useHookstate } from '@hookstate/core'
import wallet from '@/modules/core/wallet'
import state, { DefaultState, State } from '@/modules/core/wallet/store/state'
import proxies from '@/modules/utils/proxy'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'

export function useWallet() {
  const _state = useHookstate<State>(state)
  const signerOrProvider: Web3Provider | JsonRpcSigner | undefined =
    wallet.provider?.signer?.instance || wallet.provider?.instance

  return {
    signerOrProvider,
    wallet,
    state: proxies.readOnly<DefaultState, typeof _state>(_state)
  }
}

export default useWallet
