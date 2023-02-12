import type { Store } from '@/modules/core/wallet/store'
import type { Provider } from './types/wallet'
import { ProviderErrors } from './types/error'

type Options = {
  defaultChainId?: number
}

class Wallet {
  provider?: Provider
  #store: Store

  constructor(store: Store, options?: Options) {
    this.#store = store

    this.#handleOptions(options)
  }

  #handleOptions(options?: Options) {
    if (options?.defaultChainId) {
      this.#store.chainId = options.defaultChainId
    }
  }

  async use(provider: Provider) {
    this.#store.error = ''

    try {
      const injectedProvider = await provider.install()
      this.#setProvider(injectedProvider)
    } catch (error: any) {
      this.#store.error = error.message
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
    this.#store.error = ''

    try {
      await this.provider.login()
      await this.#refetchAccount()
      this.#setProviderListeners()
    } catch (error: any) {
      this.#store.error = error.message

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
      this.#store.error = error.message
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

  setModalStatus(isOpen: boolean) {
    this.#store.modalOpen = isOpen
  }

  async #onConnect() {
    await this.#refetchAccount()
  }
}

export default Wallet
