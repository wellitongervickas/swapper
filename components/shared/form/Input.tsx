import classnames from '@/modules/utils/classnames'
import { ComponentProps, ReactNode } from 'react'

export enum Variant {
  Primary
}

export enum Size {
  Default
}

interface ButtonProps extends ComponentProps<'input'> {
  label: string
  variant?: Variant
  size?: Size
  loading?: boolean
  suffix?: ReactNode
}

const Input = ({
  className,
  variant = Variant.Primary,
  size = Size.Default,
  suffix,
  ...props
}: ButtonProps) => {
  const inputStyle: string | string[] = {
    [Variant.Primary]: [
      'placeholder-stone-400 bg-stone-800 border border-stone-700 text-neutral-100',
      'focus:ring-2 focus:ring-stone-500 focus:outline-none focus-visible:ring-stone-500'
    ]
  }[variant]

  const inputSize: string = {
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
      <div className='flex flex-col space-y-2'>
        <div className='flex flex-row items-center justify-between'>
          <label htmlFor={props.id}>{props.label}</label>
          {suffix}
        </div>
        <input
          {...props}
          className={classnames.merge([
            className,
            'flex items-center justify-between space-x-2',
            'rounded-md font-semibold text-white',
            'w-full rounded-md disabled:cursor-not-allowed disabled:!opacity-40',
            inputStyle,
            inputSize
          ])}
        />
      </div>
    </>
  )
}

export default Input
