import useWallet from '@/modules/core/wallet/hooks/useWallet'
import Metamask from '@/modules/core/wallet/providers/metamask'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import string from '@/modules/utils/string'

export const WalletConnect = () => {
  const { state, wallet } = useWallet()
  const config = useChainConfig()

  const handleConnect = () => {
    if (state.connected || state.connecting) return
    const provider = new Metamask()
    wallet.use(provider).then(wallet.connect.bind(wallet))
  }

  return (
    <div className='flex space-x-2'>
      {state.connected && <div>{config.title}</div>}
      <button onClick={handleConnect}>
        {state.connected && !state.connecting && (
          <div>
            <span>{string.toEllipsis(state.address, 6, -4)}</span>
          </div>
        )}
        {state.connecting && <span>Connecting...</span>}
        {!state.connected && !state.connecting && 'Connect Wallet'}
      </button>
    </div>
  )
}

export default WalletConnect
