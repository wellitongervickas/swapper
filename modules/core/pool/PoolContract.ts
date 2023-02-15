import { Contract, Signer } from 'ethers'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { Provider } from '@ethersproject/providers'
import Logger from '@/modules/utils/logger'
import { ContractErrors } from '../contracts/types/error'

class PoolContract {
  readonly name = 'PoolContract'

  #contract: typeof Contract.prototype
  #abi = IUniswapV3PoolABI.abi

  constructor(contractAddress: string, signerOrProvider: Signer | Provider) {
    this.#contract = new Contract(contractAddress, this.#abi, signerOrProvider)
  }

  async fee(): Promise<number | undefined> {
    try {
      const fee = await this.#contract.fee()
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
