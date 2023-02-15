import { Children } from 'react'
import classnames from '@/modules/utils/classnames'

interface PinProps {
  className?: string
  maxPins?: number
  pinsClassName?: string
  animated?: boolean
}

const Pin = ({ maxPins, className, pinsClassName }: PinProps) => {
  const pins = Array.from({ length: maxPins || 4 })

  const styles = classnames.merge([
    pinsClassName || 'bg-gray-900',
    'animated-ping h-2 w-2 rounded-full'
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
