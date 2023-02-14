import { Trade } from '@uniswap/v3-sdk'
import { Token, TradeType } from '@uniswap/sdk-core'

export type TokenTrade = Trade<Token, Token, TradeType>
