import useWallet from '@/modules/core/wallet/hooks/useWallet'
import Metamask from '@/modules/core/wallet/providers/metamask'
import Button from '@/components/shared/form/Button'
import WalletInfo from './Info'

export const WalletConnect = () => {
  const { state, wallet } = useWallet()

  const handleConnect = () => {
    if (state.connected || state.connecting) return
    const provider = new Metamask()
    wallet.use(provider).then(wallet.connect.bind(wallet))
  }

  return (
    <div className='flex space-x-2'>
      {state.connected && !state.connecting && <WalletInfo />}
      {(state.connecting || !state.connected) && (
        <Button onClick={handleConnect} loading={state.connecting}>
          {state.connecting && <span>Connecting...</span>}
          {!state.connected && !state.connecting && <span>Connect Wallet</span>}
        </Button>
      )}
    </div>
  )
}

export default WalletConnect
