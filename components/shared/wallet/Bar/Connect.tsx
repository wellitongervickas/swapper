import WalletConnect from '../Connect'

interface WalletBarConnectProps {
  className?: string
}

const WalletBarConnect = ({ className }: WalletBarConnectProps) => {
  return (
    <div className={className}>
      <p>Wallet connection required.</p>
      <WalletConnect />
    </div>
  )
}

export default WalletBarConnect
