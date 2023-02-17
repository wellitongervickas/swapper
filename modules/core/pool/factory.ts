import { PoolFactoryConstructor } from './types/factory'
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { Token as IToken } from '@/modules/core/tokens/types/token'

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
    this.tokenA = PoolFactory.buildToken(params.chainId, params.tokenA)
    this.tokenB = PoolFactory.buildToken(params.chainId, params.tokenB)
  }

  get address() {
    return computePoolAddress({
      factoryAddress: this.factoryAddress,
      tokenA: this.tokenA,
      tokenB: this.tokenB,
      fee: this.fee
    })
  }

  static buildToken(chainId: number, token: IToken) {
    return new Token(
      chainId,
      token.address,
      token.decimals,
      token.symbol,
      token.name
    )
  }
}
