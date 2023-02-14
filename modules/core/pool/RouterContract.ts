import { Contract, Signer, ContractTransaction } from 'ethers'
import { Provider } from '@ethersproject/providers'
import Logger from '@/modules/utils/logger'
import { ContractErrors } from '../contracts/types/error'
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

  get signerOrProvider() {
    return this.#signerOrProvider
  }

  async quoteExactInputSingle(params: RouterExactInputSingleParams) {
    try {
      const payload = {
        ...params,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0
      }

      const estimate = await GenericContract.estimateGasByMethod(
        this.#contract,
        'exactInputSingle',
        payload
      )

      const gasLimit = await GenericContract.getGasLimit(estimate)
      const gasPrice = await GenericContract.getGasPrice(this.signerOrProvider)

      const transaction = (await this.#contract.exactInputSingle(payload, {
        gasLimit,
        gasPrice
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this.name} exactInputSingle call failed`,
        ContractErrors.TxFailed,
        error,
        true
      )
    }
  }
}

export default RouterContract
