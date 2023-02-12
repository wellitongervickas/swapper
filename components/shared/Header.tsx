import WalletConnect from '@/components/shared/wallet/Connect'

const Header = () => {
  return (
    <header className='flex justify-between p-4'>
      <div>Swapper</div>
      <div>
        <WalletConnect />
      </div>
    </header>
  )
}

export default Header
