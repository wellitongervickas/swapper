import { Children, useMemo } from 'react'
import classnames from '@/modules/utils/classnames'

interface PinProps {
  className?: string
  maxPins?: number
  pinsClassName?: string
  animated?: boolean
}

const Pin = ({ maxPins, className, pinsClassName }: PinProps) => {
  const pins = useMemo(
    () => Array.from({ length: maxPins || 4 }).fill(''),
    [maxPins]
  )

  const styles = classnames.merge([
    pinsClassName || 'bg-gray-500',
    'animated-ping h-1.5 w-1.5 rounded-full'
  ])

  return (
    <div
      className={classnames.merge([
        className,
        'flex flex-row items-center justify-between space-x-2'
      ])}
    >
      {Children.toArray(
        pins.map(() => (
          <div className='relative'>
            <div className={classnames.merge([styles])} />
            <div
              className={classnames.merge([
                styles,
                'absolute top-0 animate-ping'
              ])}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Pin
