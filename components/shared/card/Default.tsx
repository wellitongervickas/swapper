import classnames from '@/modules/utils/classnames'
import { ComponentProps, ReactNode } from 'react'

interface CardDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

const CardDefault = ({ children, className, ...props }: CardDefaultProps) => (
  <div
    className={classnames.merge([className, 'rounded-md bg-gray-900 p-4'])}
    {...props}
  >
    {children}
  </div>
)

export default CardDefault
