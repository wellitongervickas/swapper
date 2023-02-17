import { ethers } from 'ethers'
import {
  Fragment,
  JsonFragment,
  Interface as IInterface
} from '@ethersproject/abi'

export type { ContractTransaction } from 'ethers'

export const Contract = ethers.Contract

export const ContractFactory = ethers.ContractFactory

export type Interface =
  | string
  | ReadonlyArray<Fragment | JsonFragment | string>
  | IInterface
