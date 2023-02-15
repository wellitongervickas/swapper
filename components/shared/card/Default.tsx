import classnames from '@/modules/utils/classnames'
import { ComponentProps, ReactNode } from 'react'

interface CardDefaultProps extends ComponentProps<'div'> {
  children: ReactNode
}

const CardDefault = ({ children, className, ...props }: CardDefaultProps) => (
  <div
    className={classnames.merge([
      className,
      'rounded-md bg-gradient-to-t from-gray-900 to-stone-600 p-4'
    ])}
    {...props}
  >
    {children}
  </div>
)

export default CardDefault
