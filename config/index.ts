import * as chains from './chains'

const config = {
  name: 'Swapper',
  meta: {
    description: 'Decentralized finance app to swap tokens'
  },
  social: {
    discordURL: 'https://discord.com/users/gervickas.js#0001'
  },
  providers: {
    defaultChainId: chains.goerli.id
  },
  chains
}

export default config
