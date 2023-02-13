import { PoolFactoryConstructor } from './types/factory'
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
export class PoolFactory {
  chainId: number
  factoryAddress: string
  tokenA: Token
  tokenB: Token
  fee: FeeAmount = FeeAmount.LOW

  constructor(params: PoolFactoryConstructor) {
    this.chainId = params.chainId
    this.factoryAddress = params.factoryAddress
    this.fee = params.fee

    this.tokenA = new Token(
      params.chainId,
      params.tokenA.address,
      params.tokenA.decimals
    )

    this.tokenB = new Token(
      params.chainId,
      params.tokenB.address,
      params.tokenB.decimals
    )
  }

  get address() {
    return computePoolAddress({
      factoryAddress: this.factoryAddress,
      tokenA: this.tokenA,
      tokenB: this.tokenB,
      fee: this.fee
    })
  }
}
