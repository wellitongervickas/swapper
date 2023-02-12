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

  connect({ address, chainId, balance }: Partial<DefaultState>) {
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
  }

  disconnect() {
    this.connected = false
    this.connecting = false
    this.address = ''
  }
}

export type { StoreProxy }

export default StoreProxy
