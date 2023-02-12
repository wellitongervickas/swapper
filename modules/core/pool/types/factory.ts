import { Token } from '@/modules/core/tokens/types/token'
import { ethers } from 'ethers'

export type PoolFactoryConstructor = {
  chainId: number
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}

export type PoolInfo = {
  liquidity: ethers.BigNumber
  sqrtPriceX96: ethers.BigNumber
  tick: number
  tickSpacing: number
}

export type PoolConstants = {
  tokenA: string
  tokenB: string
  fee: number
}
