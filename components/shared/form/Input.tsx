import classnames from '@/modules/utils/classnames'
import { ComponentProps } from 'react'

export enum Variant {
  Primary
}

export enum Size {
  Default
}

interface ButtonProps extends ComponentProps<'input'> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const Input = ({
  className,
  variant = Variant.Primary,
  size = Size.Default,
  ...props
}: ButtonProps) => {
  const buttonStyle: string | string[] = {
    [Variant.Primary]: [
      'placeholder-stone-400 bg-stone-800 border border-stone-700 text-neutral-100',
      'focus:ring-2 focus:ring-stone-500 focus:outline-none focus-visible:ring-stone-500'
    ]
  }[variant]

  const buttonSize: string = {
    [Size.Default]: 'p-3'
  }[size]

  return (
    <>
      <style jsx scoped>
        {`
          input,
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            appearance: none;
          }
        `}
      </style>
      <input
        {...props}
        className={classnames.merge([
          className,
          'flex items-center justify-between space-x-2',
          'rounded-md font-semibold text-white',
          'w-full rounded-md disabled:cursor-not-allowed disabled:!opacity-40',
          buttonStyle,
          buttonSize
        ])}
      />
    </>
  )
}

export default Input
