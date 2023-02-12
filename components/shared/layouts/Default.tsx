import { ReactNode } from 'react'
import classnames from '@/modules/utils/classnames'
import Header from '@/components/shared/Header'
import WalletBar from '../wallet/Bar'

interface LayoutDefaultProps {
  children: ReactNode
  className?: string
}

export const LayoutDefault = ({ children, className }: LayoutDefaultProps) => {
  return (
    <div
      className={classnames.merge([
        className,
        'tracking-wide text-neutral-200'
      ])}
    >
      <Header />
      <WalletBar />
      <main>
        <div className='p-4'>{children}</div>
      </main>
    </div>
  )
}

export default LayoutDefault
