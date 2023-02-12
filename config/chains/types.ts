import { Token } from '@/modules/core/tokens/types/token'

export type ChainOptions = {
  id: number
  scanURL: string
  name: string
  title: string
}

export type ChainHub = {
  [key: string]: {
    address: string
  }
}

export type ChainToken = {
  [symbol: string]: Token
}
