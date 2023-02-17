import Logger from '@/modules/utils/logger'
import { ContractErrors } from '../contracts/types/error'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { QuoteExactInputSingleParams } from './types/quoter'
import ContractFactory from '../contracts/ContractFactory'
import { SignerOrProvider } from '../entities/provider'

class QuoterContract extends ContractFactory {
  readonly name = 'QuoterContract'

  constructor(address: string, signerOrProvider: SignerOrProvider) {
    super(address, Quoter.abi, signerOrProvider)
  }

  async quoteExactInputSingle(
    params: QuoteExactInputSingleParams
  ): Promise<string | undefined> {
    try {
      const payload = [
        params.tokenIn,
        params.tokenOut,
        params.fee,
        params.amount,
        0 // sqrtPriceLimitX96
      ]

      const quotedAmountOut =
        await this.contract.callStatic.quoteExactInputSingle(...payload)

      return quotedAmountOut.toString()
    } catch (error: any) {
      Logger.error(
        `${this.name} quoteExactInputSingle call failed`,
        ContractErrors.TxFailed,
        error,
        true
      )
    }
  }
}

export default QuoterContract
