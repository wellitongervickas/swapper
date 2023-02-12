import type { Provider } from '@/modules/core/wallet/types/wallet'
import type {
  Web3Provider,
  ExternalProvider,
  Listener
} from '@ethersproject/providers'
import { utils, providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import Signer from '@/modules/core/wallet/signer'
import { ProviderErrors } from '@/modules/core/wallet/types/error'
import Logger from '@/modules/utils/logger'

interface MetaMaskInstance extends ExternalProvider {
  on(eventName: string, listener: Listener): void
}

class Metamask implements Provider {
  readonly name = 'metamask'

  #ethereum: MetaMaskInstance | undefined

  instance: Web3Provider | undefined
  signer: Signer | undefined

  async install() {
    const _ethereum = await detectEthereumProvider()

    if (_ethereum) {
      this.#ethereum = _ethereum
      this.instance = new providers.Web3Provider(this.#ethereum, 'any')
      this.signer = new Signer(this.instance.getSigner())

      return this
    } else {
      Logger.error(`${this.name} is not available`, ProviderErrors.NotAvailable)

      return this
    }
  }

  async login(): Promise<void> {
    if (!this.#ethereum?.request) {
      Logger.error(
        `${this.name} is not initialized`,
        ProviderErrors.NotInitialized
      )
    } else {
      try {
        await this.#ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error: any) {
        Logger.error(
          `${this.name} has rejected by user`,
          ProviderErrors.UserRejected,
          error
        )
      }
    }
  }

  async logout() {
    return Promise.resolve()
  }

  async switchNetwork(chainId: number) {
    if (!this.#ethereum?.request) {
      Logger.error(
        `${this.name} is not initialized`,
        ProviderErrors.NotInitialized
      )
    } else {
      try {
        await this.#ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: utils.hexValue(chainId) }]
        })
      } catch {
        Logger.error(
          ` ${this.name} could not switch to network id ${chainId}`,
          ProviderErrors.SwitchNetworkChainId
        )
      }
    }
  }

  onAccountsChanged(callback: Listener) {
    const accountsChangedListener =
      this.instance?.listenerCount('accountsChanged')
    if (accountsChangedListener) return

    this.#ethereum?.on('accountsChanged', ([account]: string[]) => {
      callback(account)
    })
  }

  onChainChanged(callback: Listener) {
    const accountsChangedListener = this.instance?.listenerCount('chainChanged')
    if (accountsChangedListener) return

    this.#ethereum?.on('chainChanged', callback)
  }

  onConnect(callback: Listener) {
    const accountsChangedListener = this.instance?.listenerCount('connect')
    if (accountsChangedListener) return

    this.#ethereum?.on('connect', callback)
  }

  onDisconnect(callback: Listener) {
    const accountsChangedListener = this.instance?.listenerCount('disconnect')
    if (accountsChangedListener) return

    this.#ethereum?.on('disconnect', callback)
  }
}

export type { Metamask }

export default Metamask
