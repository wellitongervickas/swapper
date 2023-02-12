import useWallet from '@/modules/core/wallet/hooks/useWallet'
import Metamask from '@/modules/core/wallet/providers/metamask'
import string from '@/modules/utils/string'

export const WalletConnect = () => {
  const { state, wallet } = useWallet()

  const handleConnect = () => {
    if (state.connecting) return
    const provider = new Metamask()
    wallet.use(provider).then(wallet.connect.bind(wallet))
  }

  return (
    <button onClick={handleConnect}>
      {state.connected && !state.connecting && (
        <div>
          <span>{string.toEllipsis(state.address, 6, -4)}</span>
        </div>
      )}
      {state.connecting && <span>Connecting...</span>}
      {!state.connected && !state.connecting && 'Connect Wallet'}
    </button>
  )
}

export default WalletConnect
