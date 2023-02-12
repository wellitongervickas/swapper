import { Token } from '@/modules/core/tokens/types/token'

export type PoolFactoryConstructor = {
  chainId: number
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}
