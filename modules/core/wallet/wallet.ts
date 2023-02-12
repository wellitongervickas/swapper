import type { Store } from '@/modules/core/wallet/store'
import type { Provider, WalletOptions } from './types/wallet'
import { ProviderErrors } from './types/error'

class Wallet {
  provider?: Provider
  #store: Store
  #options: WalletOptions

  constructor(store: Store, options: WalletOptions) {
    this.#store = store
    this.#options = options

    this.#handleOptions()
  }

  #handleOptions() {
    this.#store.chainId = this.#options.defaultChainId
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
    this.provider = provider
    this.#store.providerName = provider.name
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

      if (this.#options.onlyAllowedChains) {
        this.switchToAllowedChainId()
      }
    } catch (error: any) {
      this.#store._error = error.message

      if (error?.cause?.code !== ProviderErrors.UserRejected) {
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
        this.#store.connect(account)
        this.#setProviderListeners()
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

  switchToAllowedChainId() {
    const currentChain = this.#store.chainId
    const isNetworkAllowed = this.#options.allowedChains.includes(currentChain)
    if (isNetworkAllowed) return
    this.provider?.switchNetwork(this.#options.defaultChainId)
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
