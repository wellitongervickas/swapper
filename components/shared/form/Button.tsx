import classnames from '@/modules/utils/classnames'
import { ComponentProps, ReactNode } from 'react'
import Pin from '../Pin'

export enum Variant {
  Primary,
  Secondary
}

export enum Size {
  Default
}

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
}

const Button = ({
  children,
  className,
  loading,
  variant = Variant.Primary,
  size = Size.Default,
  ...props
}: ButtonProps) => {
  const buttonStyle: string = {
    [Variant.Primary]: 'bg-primary',
    [Variant.Secondary]: 'bg-gray'
  }[variant]

  const buttonSize: string = {
    [Size.Default]: 'py-2 px-6'
  }[size]

  return (
    <button
      {...props}
      className={classnames.merge([
        className,
        'transition-all duration-200',
        'flex items-center justify-between space-x-2 hover:ring-2 hover:ring-primary hover:ring-opacity-40',
        'rounded-md font-semibold text-black focus:ring-2 focus:ring-primary focus:ring-opacity-40',
        'disabled:cursor-not-allowed disabled:bg-gray/50 disabled:text-black/50 disabled:ring-0',
        buttonStyle,
        buttonSize
      ])}
    >
      {loading && <Pin maxPins={1} />}
      <span>{children}</span>
    </button>
  )
}

export default Button
