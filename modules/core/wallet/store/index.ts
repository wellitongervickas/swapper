import state from '@/modules/core/wallet/store/state'
import StoreProxy from '@/modules/core/wallet/store/proxy'

const store = new StoreProxy(state)

export type Store = StoreProxy

export default store
