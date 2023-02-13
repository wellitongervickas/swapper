import { ethers } from 'ethers'

export type QuoteExactInputSingleParams = {
  token0: string
  token1: string
  fee: number
  amount: ethers.BigNumber
}
