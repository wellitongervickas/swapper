import { ComponentProps, ReactNode } from 'react'
import Header from '@/components/shared/Header'

interface LayoutDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const LayoutDefault = ({ children, ...props }: LayoutDefaultProps) => {
  return (
    <div {...props}>
      <Header />
      <main className='container'>{children}</main>
    </div>
  )
}

export default LayoutDefault
