import type { StateMethods, State as IState } from '@hookstate/core'
import { hookstate } from '@hookstate/core'

export class DefaultState {
  balance = '0'
  address = ''
  providerName = ''
  connected = false
  connecting = false
  chainId = 0
  _error = ''
}

const instance = new DefaultState()

const state = hookstate(instance)

type State = IState<DefaultState>

export type { State, StateMethods }

export default state
