import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import Logger from '@/modules/utils/logger'
import { ContractErrors } from '../contracts/types/error'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { QuoteExactInputSingleParams } from './types/quoter'

class QuoterContract {
  readonly name = 'QuoterContract'

  #contract: typeof Contract.prototype
  #abi = Quoter.abi

  constructor(contractAddress: string, signerOrProvider: Signer | Provider) {
    this.#contract = new Contract(contractAddress, this.#abi, signerOrProvider)
  }

  async quoteExactInputSingle(
    params: QuoteExactInputSingleParams
  ): Promise<string> {
    try {
      const payload = [
        params.token0,
        params.token1,
        params.fee,
        params.amount,
        0 // sqrtPriceLimitX96
      ]
      const quotedAmountOut =
        await this.#contract.callStatic.quoteExactInputSingle(...payload)

      return quotedAmountOut.toString()
    } catch (error: any) {
      Logger.error(
        `${this.name} quoteExactInputSingle call failed`,
        ContractErrors.TxFailed,
        error,
        true
      )

      return '0'
    }
  }
}

export default QuoterContract
