import { Contract, ethers, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { ContractErrors } from '@/modules/core/contracts/types/error'
import Logger from '@/modules/utils/logger'
import GenericContract from './Generic'

class ERC20Contract {
  readonly _name = 'ERC20Contract'

  #contract: typeof Contract.prototype
  #signerOrProvider: Signer | Provider

  #abi = [
    'function balanceOf(address spender) view returns (uint)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)'
  ]

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

  async approve(spender: string, amount: ethers.BigNumber) {
    const payload = [spender, amount]

    const receipt = await GenericContract.callTransactionByMethod.call(
      this,
      this.contract,
      this.signerOrProvider,
      'approve',
      payload
    )

    return receipt
  }

  async balanceOf(address: string): Promise<string> {
    try {
      const balanceOf = await this.contract.balanceOf(address)
      return balanceOf.toString()
    } catch (error: any) {
      Logger.error(
        `${this._name} balanceOf call failed`,
        ContractErrors.TxFailed,
        error
      )
      return '0'
    }
  }
}

export default ERC20Contract
