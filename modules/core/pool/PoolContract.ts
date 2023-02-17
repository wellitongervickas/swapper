import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import Logger from '@/modules/utils/logger'
import { ContractErrors } from '../contracts/types/error'
import ContractFactory from '../contracts/ContractFactory'
import { SignerOrProvider } from '../entities/provider'

class PoolContract extends ContractFactory {
  readonly name = 'PoolContract'

  constructor(address: string, signerOrProvider: SignerOrProvider) {
    super(address, IUniswapV3PoolABI.abi, signerOrProvider)
  }

  async fee(): Promise<number | undefined> {
    try {
      const fee = await this.contract.fee()

      return fee
    } catch (error: any) {
      Logger.error(
        `${this.name} fee call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }
}

export default PoolContract
