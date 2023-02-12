import { ReactNode } from 'react'
import classnames from '@/modules/utils/classnames'

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
      <main className='pb-12'>
        <div className='py-5 container'>{children}</div>
      </main>
    </div>
  )
}

export default LayoutDefault
