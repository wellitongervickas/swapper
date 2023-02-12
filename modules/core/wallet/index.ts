import Wallet from '@/modules/core/wallet/wallet'
import store from '@/modules/core/wallet/store'
import appConfig from '@/config'

const wallet = new Wallet(store, {
  defaultChainId: appConfig.providers.defaultChainId,
  allowedChains: Object.values(appConfig.chains).map((chain) => chain.id),
  onlyAllowedChains: true
})

export default wallet
