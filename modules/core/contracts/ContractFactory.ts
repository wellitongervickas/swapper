import { SignerOrProvider } from '../entities/provider'
import { Contract, Interface } from '../entities/contract'
import ContractUtility from './ContractUtility'

class ContractFactory extends ContractUtility {
  name = 'contract'

  #contract: Contract
  #signerOrProvider: SignerOrProvider
  #abi: Interface

  constructor(
    address: string,
    abi: Interface,
    signerOrProvider: SignerOrProvider
  ) {
    super()
    this.#signerOrProvider = signerOrProvider
    this.#abi = abi
    this.#contract = new Contract(address, abi, signerOrProvider)
  }

  get contract() {
    return this.#contract
  }

  get signerOrProvider() {
    return this.#signerOrProvider
  }

  get abi() {
    return this.#abi
  }
}

export default ContractFactory
