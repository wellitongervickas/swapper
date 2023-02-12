import type { Web3Provider, Listener } from '@ethersproject/providers'
import Signer from '@/modules/core/wallet/signer'

export type WalletOptions = {
  defaultChainId: number
  allowedChains: number[]
  onlyAllowedChains?: boolean
}

interface Provider {
  name: string
  title?: string
  signer?: Signer
  instance?: Web3Provider
  install(): Promise<Provider>
  login(): Promise<void>
  logout(): Promise<void>
  switchNetwork(chainId: number): Promise<void>
  onAccountsChanged(callback: Listener): void
  onChainChanged(callback: Listener): void
  onDisconnect(callback: Listener): void
  onConnect(callback: Listener): void
}

export type { Provider, Web3Provider }
