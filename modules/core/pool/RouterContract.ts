import Router from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

import { RouterExactInputSingleParams } from './types/router'
import { ContractErrors } from '../contracts/types/error'
import Logger from '@/modules/utils/logger'
import ContractFactory from '../contracts/ContractFactory'
import { SignerOrProvider } from '../entities/provider'
import { ContractTransaction } from '../entities/contract'

class RouterContract extends ContractFactory {
  readonly name = 'RouterContract'

  constructor(address: string, signerOrProvider: SignerOrProvider) {
    super(address, Router.abi, signerOrProvider)
  }

  async exactInputSingle(params: RouterExactInputSingleParams) {
    try {
      const payload = [
        {
          ...params,
          amountOutMinimum: 0,
          sqrtPriceLimitX96: 0
        }
      ]

      const estimate = await RouterContract.estimateGasByMethod(
        this.contract,
        'exactInputSingle',
        payload
      )

      const gasLimit = await RouterContract.getGasLimit(estimate)
      const gasPrice = await RouterContract.getGasPrice(this.signerOrProvider)

      const transaction = (await this.contract.exactInputSingle(...payload, {
        gasLimit,
        gasPrice
      })) as ContractTransaction

      const receipt = await transaction.wait()

      return receipt
    } catch (error: any) {
      Logger.error(
        `${this.name} exactInputSingle call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }
}

export default RouterContract
