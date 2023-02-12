import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { ContractErrors } from '@/modules/core/contracts/types/error'
import Logger from '@/modules/utils/logger'

class ERC20Contract {
  readonly _name = 'ERC20Contract'

  #contract: typeof Contract.prototype

  #abi = ['function balanceOf(address spender) view returns (uint)']

  constructor(contractAddress: string, signerOrProvider: Signer | Provider) {
    this.#contract = new Contract(contractAddress, this.#abi, signerOrProvider)
  }

  async balanceOf(address: string): Promise<string> {
    try {
      const balanceOf = await this.#contract.balanceOf(address)
      return balanceOf.toString()
    } catch (error: any) {
      Logger.error(
        `${this._name} balanceOf call failed`,
        ContractErrors.TxFailed,
        error,
        true
      )

      return '0'
    }
  }
}

export default ERC20Contract
