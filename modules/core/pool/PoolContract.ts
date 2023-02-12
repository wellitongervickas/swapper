import { Contract, ethers, Signer } from 'ethers'
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

  async token0(): Promise<string | undefined> {
    try {
      const token0 = await this.#contract.token0()
      return token0
    } catch (error: any) {
      Logger.error(
        `${this.name} token0 call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  async token1(): Promise<string | undefined> {
    try {
      const token1 = await this.#contract.token1()
      return token1
    } catch (error: any) {
      Logger.error(
        `${this.name} token1 call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
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

  async tickSpacing(): Promise<number | undefined> {
    try {
      const tickSpacing = await this.#contract.tickSpacing()
      return tickSpacing
    } catch (error: any) {
      Logger.error(
        `${this.name} tickSpacing call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  async liquidity(): Promise<ethers.BigNumber | undefined> {
    try {
      const liquidity = await this.#contract.liquidity()
      return liquidity
    } catch (error: any) {
      Logger.error(
        `${this.name} liquidity call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }

  async slot0(): Promise<any[] | undefined> {
    try {
      const slot0 = await this.#contract.slot0()
      return slot0
    } catch (error: any) {
      Logger.error(
        `${this.name} slot0 call failed`,
        ContractErrors.TxFailed,
        error
      )
    }
  }
}

export default PoolContract
