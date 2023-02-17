import { ethers } from 'ethers'
import { SignerOrProvider } from '../core/entities/provider'

const createRandom = (provider: ethers.providers.Provider) => {
  const signer = ethers.Wallet.createRandom().connect(provider)
  return signer
}

const signerUtils = { createRandom }

export default signerUtils
