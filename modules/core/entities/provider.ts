import { Provider } from '@ethersproject/providers'
import { Signer } from 'ethers'

export { providers } from 'ethers'

export type SignerOrProvider = Signer | Provider

export { Signer, Provider }
