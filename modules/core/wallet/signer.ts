import type { JsonRpcSigner } from '@ethersproject/providers'

class Signer {
  instance: JsonRpcSigner

  constructor(instance: JsonRpcSigner) {
    this.instance = instance
  }

  async getAddress(): Promise<string> {
    const address = await this.instance.getAddress()
    return address
  }

  async getChainId(): Promise<number> {
    const chainId = await this.instance.getChainId()
    return chainId
  }

  async getBalance(): Promise<string> {
    const balance = await this.instance.getBalance()
    return balance.toString()
  }

  async getEns(): Promise<string> {
    try {
      const address = await this.getAddress()
      const ens = await this.instance.provider.lookupAddress(address)
      return ens || ''
    } catch {
      return ''
    }
  }

  async getStatus() {
    const [address, chainId, balance, ens] = await Promise.all([
      this.getAddress(),
      this.getChainId(),
      this.getBalance(),
      this.getEns()
    ])

    return {
      address,
      chainId,
      balance,
      ens
    }
  }
}

export type { Signer }

export default Signer
