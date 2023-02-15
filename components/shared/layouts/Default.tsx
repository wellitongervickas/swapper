import { ComponentProps, ReactNode } from 'react'
import Header from '@/components/shared/Header'
import WalletBar from '../wallet/Bar'

interface LayoutDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const LayoutDefault = ({ children, ...props }: LayoutDefaultProps) => {
  return (
    <div {...props}>
      <div className='mb-4 bg-gray-900/50'>
        <Header />
        <WalletBar />
      </div>
      <main className='container'>{children}</main>
    </div>
  )
}

export default LayoutDefault
