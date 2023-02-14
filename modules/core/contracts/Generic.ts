import BigNumber from 'bignumber.js'
import { ethers, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

export class GenericContract {
  static async getGasLimit(limit: ethers.BigNumber, decimals: number = 18) {
    return new BigNumber(limit.toString(), decimals)
      .multipliedBy(1.3)
      .toFixed(0)
      .toString()
  }

  static async getGasPrice(provider: Signer | Provider) {
    const price = await provider.getGasPrice()
    return new BigNumber(price.toString())
      .multipliedBy(1.3)
      .toFixed(0)
      .toString()
  }

  static async estimateGasByMethod(
    contract: ethers.Contract,
    method: string,
    ...args: any[]
  ) {
    try {
      const estimate = await contract.estimateGas[method](args)
      return estimate
    } catch {
      const defaultGasEstimate = ethers.BigNumber.from(250000)
      return defaultGasEstimate
    }
  }
}

export default GenericContract
