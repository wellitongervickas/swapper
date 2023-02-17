import { ContractErrors } from '@/modules/core/contracts/types/error'
import Logger from '@/modules/utils/logger'
import ContractFactory from './ContractFactory'
import { SignerOrProvider } from '../entities/provider'
import { ContractTransaction } from '../entities/contract'

class WNativeContract extends ContractFactory {
  readonly _name = 'WNativeContract'

  constructor(address: string, signerOrProvider: SignerOrProvider) {
    super(address, ['function deposit() payable'], signerOrProvider)
  }

  async deposit(amount: string) {
    try {
      const estimate = await WNativeContract.estimateGasByMethod(
        this.contract,
        'deposit'
      )
      const gasLimit = WNativeContract.getGasLimit(estimate)
      const gasPrice = await WNativeContract.getGasPrice(this.signerOrProvider)
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
