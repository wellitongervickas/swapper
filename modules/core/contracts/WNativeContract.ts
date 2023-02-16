import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import GenericContract from './Generic'

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
    const receipt = await GenericContract.callTransactionByMethodPayable.call(
      this,
      this.contract,
      this.signerOrProvider,
      'deposit',
      { value: amount }
    )

    return receipt
  }
}

export default WNativeContract
