import classnames from '@/modules/utils/classnames'
import { ReactNode } from 'react'

export enum Variant {
  Error,
  Warning,
  Success
}

export enum Size {
  Default
}

interface AlertProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
}

const Alert = ({
  children,
  variant = Variant.Error,
  size = Size.Default
}: AlertProps) => {
  const alertStyle: string = {
    [Variant.Error]: 'bg-red-500 text-red-100',
    [Variant.Warning]: 'bg-yellow-500 text-yellow-100',
    [Variant.Success]: 'bg-green-500 text-green-100'
  }[variant]

  const alertSize: string = {
    [Size.Default]: 'p-2'
  }[size]

  return (
    <div className={classnames.merge([alertStyle, alertSize, 'rounded-md'])}>
      {children}
    </div>
  )
}

export default Alert
