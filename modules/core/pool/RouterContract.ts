import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import Router from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'
import { RouterExactInputSingleParams } from './types/router'
import GenericContract from '../contracts/Generic'

class RouterContract {
  readonly name = 'RouterContract'

  #contract: typeof Contract.prototype
  #abi = Router.abi
  #signerOrProvider: Signer | Provider

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

  async exactInputSingle(params: RouterExactInputSingleParams) {
    const payload = {
      ...params,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    }

    const receipt = await GenericContract.callTransactionByMethod.call(
      this,
      this.contract,
      this.signerOrProvider,
      'exactInputSingle',
      payload
    )

    return receipt
  }
}

export default RouterContract
