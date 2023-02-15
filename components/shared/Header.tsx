import WalletConnect from '@/components/shared/wallet/Connect'
import Logo from './Logo'

const Header = () => {
  return (
    <header className='flex justify-between p-4 container'>
      <Logo />
      <div>
        <WalletConnect />
      </div>
    </header>
  )
}

export default Header
