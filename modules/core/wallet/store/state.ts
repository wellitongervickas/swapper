import type { State as HookstateState } from '@hookstate/core'
import { hookstate } from '@hookstate/core'

export const DEFAULT_STATE = {
  balance: '0',
  ens: '',
  address: '',
  providerName: '',
  connected: false,
  connecting: false,
  chainId: 0,
  _error: ''
}

export type DefaultState = typeof DEFAULT_STATE

const state = hookstate(DEFAULT_STATE)

export type State = HookstateState<DefaultState>

export default state
