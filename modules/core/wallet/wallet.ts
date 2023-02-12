import type { Store } from '@/modules/core/wallet/store'
import type { Provider, WalletOptions } from './types/wallet'
import { ProviderErrors } from './types/error'

class Wallet {
  provider?: Provider
  #store: Store

  constructor(store: Store, options?: WalletOptions) {
    this.#store = store
    this.#handleOptions(options)
  }

  #handleOptions(options?: WalletOptions) {
    if (options?.defaultChainId) {
      this.#store.chainId = options?.defaultChainId
    }
  }

  async use(provider: Provider) {
    this.#store._error = ''

    try {
      const providerInstance = await provider.install()
      this.#setProvider(providerInstance)
    } catch (error: any) {
      this.#store._error = error.message
    }
  }

  #setProvider(provider: Provider) {
    this.#store.providerName = provider.name
    this.provider = provider
  }

  async connect() {
    if (!this.provider) {
      return
    }

    this.#store.connecting = true
    this.#store._error = ''

    try {
      await this.provider.login()
      await this.#refetchAccount()
      this.#setProviderListeners()
    } catch (error: any) {
      this.#store._error = error.message

      if (error.cause.code !== ProviderErrors.UserRejected) {
        this.disconnect()
      }
    } finally {
      this.#store.connecting = false
    }
  }

  async #refetchAccount() {
    try {
      const account = await this.provider?.signer?.getStatus()

      if (account) {
        this.#setProviderListeners()
        this.#store.connect(account)
      }
    } catch (error: any) {
      this.#store._error = error.message
      this.#store.disconnect()
    }
  }

  #setProviderListeners() {
    this.provider?.onAccountsChanged(this.#onAccountsChanged.bind(this))
    this.provider?.onChainChanged(this.#onChainChanged.bind(this))
    this.provider?.onDisconnect(this.disconnect.bind(this))
    this.provider?.onConnect(this.#onConnect.bind(this))
  }

  async disconnect() {
    this.#store.disconnect()

    await this.provider?.logout()

    this.provider = undefined
  }

  async #onAccountsChanged(address: string) {
    if (address) {
      await this.#refetchAccount()
    } else {
      this.#store.disconnect()
    }
  }

  async #onChainChanged() {
    await this.#refetchAccount()
  }

  async #onConnect() {
    await this.#refetchAccount()
  }
}

export default Wallet
