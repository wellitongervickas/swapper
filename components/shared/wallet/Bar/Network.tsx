import config from '@/config'
import useWallet from '@/modules/core/wallet/hooks/useWallet'

interface WalletBarNetworkProps {
  className?: string
}

const WalletBarNetwork = ({ className }: WalletBarNetworkProps) => {
  const { wallet } = useWallet()

  const onSwitchNetwork = async () => {
    await wallet.provider?.switchNetwork(config.providers.defaultChainId)
  }

  return (
    <div className={className}>
      <p>Network is not available</p>
      <button onClick={onSwitchNetwork}>Switch network</button>
    </div>
  )
}

export default WalletBarNetwork
