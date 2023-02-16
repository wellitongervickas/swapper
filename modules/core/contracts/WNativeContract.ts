import { Contract, ContractTransaction, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import GenericContract from './Generic'
import { ContractErrors } from './types/error'
import Logger from '@/modules/utils/logger'

class WNativeContract {
  readonly _name = 'WNativeContract'

  #contract: typeof Contract.prototype
  #signerOrProvider: Signer | Provider

  #abi = ['function deposit() payable']

  constructor(contractAddress: string, signerOrProvider: Signer | Provider) {
    this.#signerOrProvider = signerOrProvider
    this.#contract = new Contract(contractAddress, this.#abi, signerOrProvider)
  }

  get contract() {
    return this.#contract
  }

  get signerOrProvider() {
    return this.#signerOrProvider
  }

  async deposit(amount: string) {
    try {
      const estimate = await GenericContract.estimateGasByMethod(
        this.contract,
        'deposit'
      )

      const gasLimit = await GenericContract.getGasLimit(estimate)
      const gasPrice = await GenericContract.getGasPrice(this.signerOrProvider)

      const transaction = (await this.contract.deposit({
        gasLimit,
        gasPrice,
        value: amount
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this._name} deposit call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }
}

export default WNativeContract
