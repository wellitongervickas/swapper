import { ethers } from 'ethers'

export { Contract } from 'ethers'

import {
  Fragment,
  JsonFragment,
  Interface as IInterface
} from '@ethersproject/abi'

export type { ContractTransaction, ContractFunction } from 'ethers'

export const ContractFactory = ethers.ContractFactory

export type Interface =
  | string
  | ReadonlyArray<Fragment | JsonFragment | string>
  | IInterface
