import {
  State,
  DefaultState,
  StateMethods
} from '@/modules/core/wallet/store/state'

import { merge } from '@/modules/utils/objects'
import { StateProperties } from '../types/store'

class StoreProxy extends DefaultState {
  #state: State

  constructor(state: State) {
    super()

    Object.defineProperties(
      this,
      Object.keys(state).reduce((thisContext, key) => {
        const propertyKey = key as keyof State
        let property = state[propertyKey] as StateMethods<{}, {}>

        thisContext = merge(thisContext, {
          [key]: {
            enumerable: true,
            set: property?.set,
            get: property?.get
          } as StateProperties<State>[keyof State]
        })

        return thisContext
      }, {})
    )
    this.#state = state
  }

  connect({ address, chainId, balance, ens }: Partial<DefaultState>) {
    this.#state.connected.set(true)

    if (address) {
      this.#state.address.set(address)
    }

    if (chainId) {
      this.#state.chainId.set(chainId)
    }

    if (balance) {
      this.#state.balance.set(balance)
    }

    if (ens) {
      this.#state.ens.set(ens)
    }
  }

  disconnect() {
    this.#state.connected.set(false)
    this.#state.connecting.set(false)
    this.#state.address.set('')
  }
}

export type { StoreProxy }

export default StoreProxy
