import { SignerOrProvider } from './../entities/provider'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Contract } from '../entities/contract'

export class ContractUtility {
  static readonly DEFAULT_GAS_LIMIT = ethers.BigNumber.from(250000)

  static getGasLimit(limit: ethers.BigNumber, decimals: number = 18) {
    return new BigNumber(limit.toString(), decimals)
      .multipliedBy(1.3)
      .toFixed(0)
      .toString()
  }

  static async getGasPrice(provider: SignerOrProvider) {
    const price = await provider.getGasPrice()
    return new BigNumber(price.toString())
      .multipliedBy(1.3)
      .toFixed(0)
      .toString()
  }

  static async estimateGasByMethod(
    contract: Contract,
    method: string,
    ...args: any[]
  ) {
    try {
      const estimate = await contract.estimateGas[method](args)
      return estimate
    } catch {
      return ContractUtility.DEFAULT_GAS_LIMIT
    }
  }
}

export default ContractUtility
