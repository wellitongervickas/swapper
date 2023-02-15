import useWallet from '@/modules/core/wallet/hooks/useWallet'
import Metamask from '@/modules/core/wallet/providers/metamask'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import string from '@/modules/utils/string'
import Button from '@/components/shared/form/Button'
import classnames from '@/modules/utils/classnames'
import Pin from '../Pin'

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
      {state.connected && !state.connecting && (
        <div
          className={classnames.merge([
            'rounded-md border border-white py-2 px-6',
            'flex items-center justify-between space-x-4'
          ])}
        >
          <span>{config.title}</span>
          <span>
            <Pin maxPins={1} pinsClassName='bg-primary' />
          </span>
          <span>{string.toEllipsis(state.address, 6, -4)}</span>
        </div>
      )}

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
