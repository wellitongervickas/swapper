import WalletConnect from '@/components/shared/wallet/Connect'
import Logo from './Logo'

const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 shadow-lg container'>
      <Logo />
      <div>
        <WalletConnect />
      </div>
    </header>
  )
}

export default Header
