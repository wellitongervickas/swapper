import Wallet from '@/modules/core/wallet/wallet'
import store from '@/modules/core/wallet/store'
import config from '@/config'

const wallet = new Wallet(store, {
  defaultChainId: config.providers.defaultChainId,
  allowedChains: Object.values(config.chains).map((chain) => chain.id),
  onlyAllowedChains: true
})

export default wallet
