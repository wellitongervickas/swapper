import { ContractErrors } from '@/modules/core/contracts/types/error'
import Logger from '@/modules/utils/logger'
import ContractFactory from './ContractFactory'
import { SignerOrProvider } from '../entities/provider'
import { ContractTransaction } from '../entities/contract'

class ERC20Contract extends ContractFactory {
  readonly _name = 'ERC20Contract'

  constructor(address: string, signerOrProvider: SignerOrProvider) {
    super(
      address,
      [
        'function balanceOf(address spender) view returns (uint)',
        'function approve(address spender, uint256 amount) external returns (bool)',
        'function allowance(address owner, address spender) external view returns (uint256)'
      ],
      signerOrProvider
    )
  }

  async allowance(owner: string, spender: string) {
    try {
      const allowance = await this.contract.allowance(owner, spender)
      return allowance.toString()
    } catch (error: any) {
      Logger.error(
        `${this._name} allowance call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  async approve(spender: string, amount: string) {
    try {
      const payload = [spender, amount]

      const estimate = await ERC20Contract.estimateGasByMethod(
        this.contract,
        'approve',
        payload
      )

      const gasLimit = ERC20Contract.getGasLimit(estimate)
      const gasPrice = await ERC20Contract.getGasPrice(this.signerOrProvider)

      const transaction = (await this.contract.approve(...payload, {
        gasLimit,
        gasPrice
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this._name} approve call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  async balanceOf(address: string): Promise<string | undefined> {
    try {
      const balanceOf = await this.contract.balanceOf(address)

      return balanceOf.toString()
    } catch (error: any) {
      Logger.error(
        `${this._name} balanceOf call failed`,
        ContractErrors.TxFailed,
        error,
        true
      )
    }

    return '0'
  }
}

export default ERC20Contract
