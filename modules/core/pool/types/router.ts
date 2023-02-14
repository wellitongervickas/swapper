import { Trade } from '@uniswap/v3-sdk'
import { Token, TradeType } from '@uniswap/sdk-core'

export type TokenTrade = Trade<Token, Token, TradeType>

export type RouterExactInputSingleParams = {
  tokenIn: string
  tokenOut: string
  fee: number
  recipient: string
  deadline: number
  amountIn: string
}
