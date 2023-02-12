import {
  State,
  DefaultState,
  StateMethods
} from '@/modules/core/wallet/store/state'

import { merge } from '@/modules/utils/objects'

type StateProperties = {
  [P in keyof State]: {
    enumerable: boolean
    set: ((value: State[P]) => void) | undefined
    get: (() => State[P]) | undefined
  }
}

class StoreProxy {
  #state: State

  constructor(state: State) {
    this.#state = state
    Object.defineProperties(
      this,
      Object.keys(state).reduce((thisContext, key) => {
        const property = state as StateMethods<DefaultState, {}>
        const propertyKey = key as keyof StateMethods<DefaultState, {}>

        thisContext = merge(thisContext, {
          [key]: {
            enumerable: true,
            set: property[propertyKey]?.set,
            get: property[propertyKey]?.get
          } as StateProperties[keyof State]
        })

        return thisContext
      }, {})
    )
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
