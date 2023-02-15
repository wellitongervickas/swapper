import { Token } from '@/modules/core/tokens/types/token'
import { FeeAmount } from '@uniswap/v3-sdk'

export type PoolFactoryConstructor = {
  chainId: number
  factoryAddress: string
  tokenA: Token
  tokenB: Token
  fee: FeeAmount
}

export type PoolConstants = {
  tokenA: string
  tokenB: string
  fee: number
}
