import type { State, DefaultState } from '@/modules/core/wallet/store/state'

class StoreProxy {
  #state: State

  constructor(state: State) {
    this.#state = state
  }

  set connected(connected: boolean) {
    this.#state.connected.set(connected)
  }

  set connecting(connecting: boolean) {
    this.#state.connecting.set(connecting)
  }

  set error(error: string) {
    this.#state._error.set(error)
  }

  set address(address: string) {
    this.#state.address.set(address)
  }

  set chainId(chainId: number) {
    this.#state.chainId.set(chainId)
  }

  set providerName(providerName: string) {
    this.#state.providerName.set(providerName)
  }

  set balance(balance: string) {
    this.#state.balance.set(balance)
  }

  set ens(ens: string) {
    this.#state.ens.set(ens)
  }

  connect({ address, chainId, balance, ens }: Partial<DefaultState>) {
    this.connected = true

    if (address) {
      this.address = address
    }

    if (chainId) {
      this.chainId = chainId
    }

    if (balance) {
      this.balance = balance
    }

    if (ens) {
      this.ens = ens
    }
  }

  disconnect() {
    this.connected = false
    this.connecting = false
    this.address = ''
  }
}

export type { StoreProxy }

export default StoreProxy
