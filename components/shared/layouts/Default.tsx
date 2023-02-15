import { ComponentProps, ReactNode } from 'react'
import Header from '@/components/shared/Header'
import WalletBar from '../wallet/Bar'

interface LayoutDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <Header />
      <WalletBar />
      <main className='container'>{children}</main>
    </div>
  )
}

export default LayoutDefault
