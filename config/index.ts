import * as chains from './chains'

const config = {
  name: 'Swapper',
  meta: {
    description: 'Decentralized finance app to swap tokens'
  },
  providers: {
    defaultChainId: chains.goerli.id
  },
  chains
}

export default config
