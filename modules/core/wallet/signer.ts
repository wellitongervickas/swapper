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

  async getStatus() {
    const [address, chainId, balance] = await Promise.all([
      this.getAddress(),
      this.getChainId(),
      this.getBalance()
    ])

    return {
      address,
      chainId,
      balance
    }
  }
}

export type { Signer }

export default Signer
