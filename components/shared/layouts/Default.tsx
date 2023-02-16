import { ComponentProps, ReactNode } from 'react'
import Header from '@/components/shared/Header'

interface LayoutDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default LayoutDefault
