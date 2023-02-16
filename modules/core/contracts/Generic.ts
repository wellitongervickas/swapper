import BigNumber from 'bignumber.js'
import {
  Contract,
  ContractTransaction,
  ContractReceipt,
  ethers,
  Signer
} from 'ethers'
import { Provider } from '@ethersproject/providers'
import Logger from '@/modules/utils/logger'
import { ContractErrors } from './types/error'

export const DEFAULT_GAS_LIMIT = ethers.BigNumber.from(250000)

export class GenericContract {
  static async callTransactionByMethodPayable<T = any>(
    contract: Contract,
    signerOrProvider: Signer | Provider,
    method: string,
    options: { value: string },
    data?: T
  ): Promise<ContractReceipt | undefined> {
    try {
      const estimate = await GenericContract.estimateGasByMethod(
        contract,
        method,
        data
      )

      const gasLimit = await GenericContract.getGasLimit(estimate)
      const gasPrice = await GenericContract.getGasPrice(signerOrProvider)
      const txData = data ? [data].flat() : []

      const transaction = (await contract[method](...txData, {
        gasLimit,
        gasPrice,
        ...options
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this.name} ${method} call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  static async callTransactionByMethod<T = any>(
    contract: Contract,
    signerOrProvider: Signer | Provider,
    method: string,
    data?: T
  ) {
    try {
      const estimate = await GenericContract.estimateGasByMethod(
        contract,
        method,
        data
      )

      const gasLimit = await GenericContract.getGasLimit(estimate)
      const gasPrice = await GenericContract.getGasPrice(signerOrProvider)
      const txData = data ? [data].flat() : []

      const transaction = (await contract[method](...txData, {
        gasLimit,
        gasPrice
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this.name} ${method} call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

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
      return DEFAULT_GAS_LIMIT
    }
  }
}

export default GenericContract
