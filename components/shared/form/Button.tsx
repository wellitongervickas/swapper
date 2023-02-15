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
        'flex items-center justify-between space-x-2',
        'rounded-md font-semibold text-black',
        'disabled:cursor-not-allowed disabled:bg-gray/50 disabled:text-black/50',
        buttonStyle,
        buttonSize
      ])}
    >
      {loading && <Pin maxPins={1} />}
      {children}
    </button>
  )
}

export default Button
